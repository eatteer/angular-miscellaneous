import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  public constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<any> {
    const endpoint = `${this.baseUrl}/users`;
    return this.httpClient.get(endpoint).pipe(delay(1500));
  }

  public getUsersWithError(): Observable<any> {
    const endpoint = `${this.baseUrl}/uzerz`;
    return this.httpClient.get(endpoint).pipe(delay(1500));
  }
}
