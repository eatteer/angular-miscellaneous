export interface AGridEventListener {
  eventType: string;
  listener: Function;
}

export interface PaginatorConfig {
  page: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface GetPaginationParams {
  forPage?: number;
  limit?: number;
}
