export interface AGridEventListener {
  eventType: string;
  listener: Function;
}

export interface PaginatorConfig {
  page: number;
  totalItems: number;
  itemsPerPage: number;
}
