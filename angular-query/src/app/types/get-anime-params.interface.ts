export interface GetAnimeQueryParams {
  q: string;
  limit: number;
  page: number;
}

export interface GetInfiniteAnimeQueryParams
  extends Omit<GetAnimeQueryParams, 'page'> {}
