import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated(): Promise<boolean> {
    const hasToken = Boolean(localStorage.getItem('token'));
    return Promise.resolve(hasToken);
  }
}
