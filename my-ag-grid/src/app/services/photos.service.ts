import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Photo } from '../types/photo.type';
import { Paginated } from '../types/params.types';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private _endpoint = 'https://jsonplaceholder.typicode.com/photos';

  public constructor(private _httpClient: HttpClient) {}

  public getPhotos(): Observable<Paginated<Photo>> {
    return this._httpClient
      .get<Photo[]>(this._endpoint, {
        params: {
          _start: 0,
          _limit: 10,
        },
      })
      .pipe(
        map((photos) => {
          const response: Paginated<Photo> = {
            data: photos,
            count: this._getRandomNumber(50, 5000),
          };
          return response;
        })
      );
  }

  private _getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
