import { Anime } from './anime.interface';

export interface JikanResponse {
  pagination: Pagination;
  data: Anime[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}
