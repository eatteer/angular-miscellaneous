import { ColDef, GridOptions } from 'ag-grid-community';

export const OPTIONS_SORT_CONFIG: Partial<GridOptions> = {
  suppressMultiSort: true,
};

export const DEFAULT_SORT_CONFIG: ColDef = {
  sortable: true,
  sortingOrder: ['asc', 'desc'],
  comparator: () => 0,
};
