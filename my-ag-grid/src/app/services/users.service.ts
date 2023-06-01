import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _endpoint = 'https://jsonplaceholder.typicode.com/users';

  public constructor(private _httpClient: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this._endpoint);
  }
}
