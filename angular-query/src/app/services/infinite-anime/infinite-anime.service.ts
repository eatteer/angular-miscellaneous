import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UseInfiniteQuery } from '@ngneat/query';
import { GetInfiniteAnimeQueryParams } from 'src/app/types/get-anime-params.interface';
import { JikanResponse } from 'src/app/types/jikan-response.interface';

@Injectable({
  providedIn: 'root',
})
export class InfiniteAnimeService {
  private ANIME_ENDPOINT = 'https://api.jikan.moe/v4/anime';

  private httpClient = inject(HttpClient);
  private useInfiniteQuery = inject(UseInfiniteQuery);

  public getInfiniteAnime(params: GetInfiniteAnimeQueryParams) {
    return this.useInfiniteQuery({
      refetchOnWindowFocus: false,
      queryKey: ['infinite-anime', params],
      queryFn: ({ pageParam = 1 }) => {
        const httpParams = new HttpParams({
          fromObject: {
            q: params.q,
            limit: params.limit.toString(),
            page: pageParam.toString(),
          },
        });

        return this.httpClient.get<JikanResponse>(this.ANIME_ENDPOINT, {
          params: httpParams,
        });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.has_next_page) {
          return lastPage.pagination.current_page + 1;
        }

        return undefined;
      },
    });
  }
}
