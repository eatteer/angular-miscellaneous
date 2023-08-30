import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';
import { GetAnimeQueryParams } from 'src/app/types/get-anime-params.interface';
import { JikanResponse } from 'src/app/types/jikan-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private ANIME_ENDPOINT = 'https://api.jikan.moe/v4/anime';
  private ANIME_QUERY_KEY = 'anime';

  private httpClient = inject(HttpClient);
  private useQuery = inject(UseQuery);

  public getAnimes(params: GetAnimeQueryParams) {
    const httpParams = new HttpParams({
      fromObject: {
        q: params.q,
        limit: params.limit.toString(),
        page: params.page.toString(),
      },
    });

    return this.useQuery({
      queryKey: [this.ANIME_QUERY_KEY, params],
      queryFn: () => {
        return this.httpClient
          .get<JikanResponse>(this.ANIME_ENDPOINT, {
            params: httpParams,
          })
          .pipe(tap(console.log));
      },
    });
  }
}
