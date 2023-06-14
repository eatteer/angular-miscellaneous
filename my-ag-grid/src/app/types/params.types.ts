export interface Sort {
  orderBy: string | null;
  order: 'asc' | 'desc' | null | undefined;
}

export interface Paginated<T> {
  data: T[];
  count: number;
}

export interface Pagination {
  limit: number;
  offset: number;
}
