import { Injectable } from '@angular/core';
import { Sort } from '../types/params.types';
import { SortChangedEvent } from 'ag-grid-community';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  public nullSort: Sort = { orderBy: null, order: null };

  public constructor() {}

  public createSort(event: SortChangedEvent): Sort {
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
