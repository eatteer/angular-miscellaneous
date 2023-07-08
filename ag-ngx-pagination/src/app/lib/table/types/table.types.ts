import { ColDef, GridApi, GridOptions } from 'ag-grid-community';

export interface Table<Data> {
  api: GridApi<Data> | null;
  options: GridOptions;
  data: Data[];
  initialSort?: Sort;
}

export interface Sort {
  orderBy: string | null;
  order: 'asc' | 'desc' | null | undefined;
}

export interface GridEventListener {
  eventType: string;
  listener: Function;
}
