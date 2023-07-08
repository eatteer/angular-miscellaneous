import { Injectable, OnDestroy } from '@angular/core';
import { GridApi, SortChangedEvent } from 'ag-grid-community';
import { GridEventListener, Sort } from '../../types/table.types';
import { Subject } from 'rxjs';

const API_NOT_REGISTERED_MESSAGE = 'Grid API was not registered';

@Injectable()
export class TableService implements OnDestroy {
  public api: GridApi | null = null;
  private gridListeners: GridEventListener[] = [];

  public currentSort: Sort = { order: null, orderBy: null };
  public sortChanged$ = new Subject<Sort>();

  public constructor() {}

  public registerApi(api: GridApi): void {
    this.api = api;
  }

  public registerSort(initialSort: Sort): void {
    this.configureSortEvent();
    this.setSort(initialSort);
  }

  private configureSortEvent(): void {
    if (!this.api) throw new Error(API_NOT_REGISTERED_MESSAGE);

    const onSortChangedEvent = (event: SortChangedEvent) => {
      const sort = this.createSort(event);
      this.setSort(sort);
    };

    this.api.addEventListener('sortChanged', onSortChangedEvent);

    this.gridListeners.push({
      eventType: 'sortChanged',
      listener: onSortChangedEvent,
    });
  }

  public setSort(sort: Sort): void {
    this.currentSort = sort;
    this.sortChanged$.next(sort);
  }

  public ngOnDestroy(): void {
    if (this.api && this.gridListeners.length > 0) {
      this.gridListeners.forEach((agridListener) => {
        const { eventType, listener } = agridListener;
        this.api!.removeEventListener(eventType, listener);
      });
    }
  }

  private createSort(event: SortChangedEvent): Sort {
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
