import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  skip,
} from 'rxjs';
import { GridApi, SortChangedEvent } from 'ag-grid-community';
import { Pagination, Sort } from '../../types/params.types';
import { AGridEventListener, PaginatorConfig } from '../ag-grid.types';
import { PaginatorComponent } from '../components/paginator/paginator.component';

@Injectable()
export class AgTableService implements OnDestroy {
  private _gridApi?: GridApi;
  private _agGridListeners: AGridEventListener[] = [];

  private _subscriptions: Subscription[] = [];

  private _paginator!: PaginatorComponent;

  public sortChanged$ = new BehaviorSubject<Sort | null>(null);
  public paginationChanged$ = new BehaviorSubject<number>(1);

  public currentSort: Sort | null = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  public constructor() {}

  public registerApi(gridApi: GridApi): void {
    this._gridApi = gridApi;
  }

  public registerSort(defaultSort: Sort): void {
    this.currentSort = defaultSort;

    const onSortChangedEvent = (event: SortChangedEvent) => {
      const sort = this._createSort(event);
      this.currentSort = sort;
      this.sortChanged$.next(sort);
    };

    if (!this._gridApi) throw new Error('Grid API was not registered');

    this._gridApi.addEventListener('sortChanged', onSortChangedEvent);

    this._agGridListeners.push({
      eventType: 'sortChanged',
      listener: onSortChangedEvent,
    });
  }

  public registerPaginator(
    paginator: PaginatorComponent,
    config: PaginatorConfig
  ): void {
    this._paginator = paginator;

    const subscription = paginator.paginationChanged$.subscribe((page) => {
      this.currentPage = page;
      this.paginationChanged$.next(page);
    });

    this._subscriptions.push(subscription);

    this.setPaginatorConfig(config, false);
  }

  public setPaginatorConfig(
    config: PaginatorConfig,
    shouldEmitPaginationChanged = true
  ): void {
    this.currentPage = config.page;

    this._paginator.selectPage(
      String(config.page),
      shouldEmitPaginationChanged
    );
    // If backend send count = 0, use 1 instead so that the paginator can be shown
    this._paginator.collectionSize = config.totalItems || 1;
    this._paginator.pageSize = config.itemsPerPage;
    this.itemsPerPage = config.itemsPerPage;
  }

  public getSort(): Sort {
    if (!this.currentSort) throw new Error('Sort was not registered');
    return this.currentSort;
  }

  public getPagination(forPage: number = this.currentPage): Pagination {
    const limit = this.itemsPerPage;
    const offset = limit * (forPage - 1);

    return { limit, offset };
  }

  public createCombineForSortAndPagination(): Observable<
    [Sort | null, number]
  > {
    const combined$ = combineLatest([
      this.sortChanged$,
      this.paginationChanged$,
    ]).pipe(skip(1));

    return combined$;
  }

  public ngOnDestroy(): void {
    this._agGridListeners.forEach((agridListener) => {
      const { eventType, listener } = agridListener;
      this._gridApi?.removeEventListener(eventType, listener);
    });

    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
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
