import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;
  public isPrime = false;

  public constructor() {
    console.log('AuthService.constructor');
  }
}
