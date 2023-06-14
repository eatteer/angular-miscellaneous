import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { GridApi, SortChangedEvent } from 'ag-grid-community';
import { Pagination, Sort } from '../../types/params.types';
import { AGridEventListener, PaginatorConfig } from '../ag-grid.types';
import { PaginationComponent } from '../components/paginator/paginator.component';

@Injectable()
export class AgTableService implements OnDestroy {
  private _gridApi!: GridApi;
  private _agGridListeners: AGridEventListener[] = [];

  private _listeners: Subscription[] = [];
  private _nullSort: Sort = { orderBy: null, order: null };

  private _paginator!: PaginationComponent;

  public sortChanged$ = new BehaviorSubject(this._nullSort);
  public paginationChanged$ = new BehaviorSubject(1);

  public constructor() {}

  /**
   * Registering AG Grid API allows to receive updates about sorting
   * through {@link sortChanged$} observable
   */
  public registerApi(gridApi: GridApi): void {
    this._gridApi = gridApi;
    this._registerSortChangedEvent();
  }

  /**
   * Registering PaginationComponent allows to receive updates about pagination
   * through {@link paginationChanged$} observable
   */
  public registerPagination(paginator: PaginationComponent): void {
    this._paginator = paginator;
    const subscriptino = paginator.paginationChanged$.subscribe((page) => {
      this.paginationChanged$.next(page);
    });

    this._listeners.push(subscriptino);
  }

  public setPaginationConfig(config: PaginatorConfig): void {
    this._paginator.selectPage(String(1));
    this._paginator.collectionSize = config.totalItems;
    this._paginator.pageSize = config.itemsPerPage;
  }

  public ngOnDestroy(): void {
    this._agGridListeners.forEach((agridListener) => {
      const { eventType, listener } = agridListener;
      this._gridApi.removeEventListener(eventType, listener);
    });

    this._listeners.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private _registerSortChangedEvent(): void {
    const onSortChangedEvent = (event: SortChangedEvent) => {
      const sort = this._createSort(event);
      this.sortChanged$.next(sort);
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
