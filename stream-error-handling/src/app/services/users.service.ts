import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public user = 'debviluke';

  public getUser(): Observable<string> {
    return of(this.user).pipe(delay(2000));
  }

  public getUserWithError(): Observable<string> {
    return of(this.user).pipe(
      delay(2000),
      tap((_) => {
        throw new Error(`Cannot get ${this.user}`);
      })
    );
  }
}
