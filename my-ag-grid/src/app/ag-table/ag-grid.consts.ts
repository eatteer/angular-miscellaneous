import { ColDef } from 'ag-grid-community';

export const sortableConfig: ColDef = {
  sortable: true,
  comparator: () => 0,
  sortingOrder: ['asc', 'desc'],
};
