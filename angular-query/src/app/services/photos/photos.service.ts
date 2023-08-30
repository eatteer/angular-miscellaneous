import { Injectable, inject } from '@angular/core';
import { delay, of, tap } from 'rxjs';
import { QueryClientService, UseQuery, UseMutation } from '@ngneat/query';
import { Photo } from 'src/app/types/photo.interface';
import { PHOTOS } from './photos';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private PHOTOS_QUERY_KEY = 'photos';

  private queryClient = inject(QueryClientService);
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);

  public getPhotos() {
    return this.useQuery([this.PHOTOS_QUERY_KEY], () => {
      return of(PHOTOS).pipe(delay(1000));
    });
  }

  public addPhoto() {
    return this.useMutation((photo: Photo) => {
      return of(true).pipe(
        delay(1000),
        tap((_) => {
          PHOTOS.unshift(photo);
          this.queryClient.invalidateQueries([this.PHOTOS_QUERY_KEY]);
        })
      );
    });
  }
}
