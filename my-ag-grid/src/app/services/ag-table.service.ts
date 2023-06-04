import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridApi, SortChangedEvent } from 'ag-grid-community';
import { Sort } from '../types/params.types';
import { AGridEventListener } from '../types/ag-grid.types';

@Injectable()
export class AgTableService implements OnDestroy {
  private _gridApi!: GridApi;
  private _agGridListeners: AGridEventListener[] = [];
  private _nullSort: Sort = { orderBy: null, order: null };

  public sort$: BehaviorSubject<Sort> = new BehaviorSubject(this._nullSort);

  public constructor() {}

  /**
   * Registering AG Grid API allows to receive updates about sorting
   * through {@link sort$} observable
   */
  public registerAgGridApi(gridApi: GridApi): void {
    this._gridApi = gridApi;
    this._registerSortChangedEvent();
  }

  public ngOnDestroy(): void {
    this._agGridListeners.forEach((agridListener) => {
      const { eventType, listener } = agridListener;
      this._gridApi.removeEventListener(eventType, listener);
    });
  }

  private _registerSortChangedEvent(): void {
    const onSortChangedEvent = (event: SortChangedEvent) => {
      const sort = this._createSort(event);
      this.sort$.next(sort);
    };

    this._gridApi.addEventListener('sortChanged', onSortChangedEvent);

    this._agGridListeners.push({
      eventType: 'sortChanged',
      listener: onSortChangedEvent,
    });
  }

  private _createSort(event: SortChangedEvent): Sort {
    const sortedColumn = event.columnApi
      .getColumnState()
      .find((columnState) => columnState.sort !== null);

    let currentSort: Sort = { orderBy: null, order: null };

    if (sortedColumn) {
      const { colId, sort } = sortedColumn;
      currentSort = { orderBy: colId, order: sort };
    }

    return currentSort;
  }
}
