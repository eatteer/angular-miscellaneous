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
import {
  AGridEventListener,
  GetPaginationParams,
  PaginatorConfig,
} from '../ag-grid.types';
import { PaginatorComponent } from '../components/paginator/paginator.component';

@Injectable()
export class AgTableService implements OnDestroy {
  private gridApi?: GridApi;
  private agGridListeners: AGridEventListener[] = [];

  private subscriptions: Subscription[] = [];

  private paginator!: PaginatorComponent;

  public sortChanged$ = new BehaviorSubject<Sort | null>(null);
  public paginationChanged$ = new BehaviorSubject<number>(1);

  public currentSort: Sort | null = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  public constructor() {}

  public registerApi(gridApi: GridApi): void {
    this.gridApi = gridApi;
  }

  public registerSort(defaultSort: Sort): void {
    this.setSort(defaultSort);

    const onSortChangedEvent = (event: SortChangedEvent) => {
      const sort = this.createSort(event);
      this.setSort(sort);
    };

    if (!this.gridApi) throw new Error('Grid API was not registered');

    this.gridApi.addEventListener('sortChanged', onSortChangedEvent);

    this.agGridListeners.push({
      eventType: 'sortChanged',
      listener: onSortChangedEvent,
    });
  }

  public setSort(sort: Sort): void {
    this.currentSort = sort;
    this.sortChanged$.next(sort);
  }

  public registerPaginator(
    paginator: PaginatorComponent,
    config: PaginatorConfig
  ): void {
    this.paginator = paginator;

    const subscription = paginator.paginationChanged$.subscribe((page) => {
      this.setPagination(page);
    });

    this.subscriptions.push(subscription);

    this.setPaginatorConfig(config);
  }

  public setPagination(page: number): void {
    this.currentPage = page;
    this.paginationChanged$.next(page);
  }

  public setPaginatorConfig(
    config: PaginatorConfig,
    shouldEmitPaginationChanged = false
  ): void {
    this.currentPage = config.page;

    this.paginator.selectPage(String(config.page), shouldEmitPaginationChanged);
    // If backend send count = 0, use 1 instead so that the paginator can be shown
    this.paginator.collectionSize = config.totalItems || 1;
    this.paginator.pageSize = config.itemsPerPage;
    this.itemsPerPage = config.itemsPerPage;
  }

  public getSort(): Sort {
    if (!this.currentSort) throw new Error('Sort was not registered');
    return this.currentSort;
  }

  public getPagination({
    forPage = this.currentPage,
    limit = this.itemsPerPage,
  }: GetPaginationParams): Pagination {
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
    this.agGridListeners.forEach((agridListener) => {
      const { eventType, listener } = agridListener;
      this.gridApi?.removeEventListener(eventType, listener);
    });

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
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
