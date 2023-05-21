import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersMockService {
  public constructor() {
    this.print();
  }

  public print(): void {
    console.log('UsersMockService');
  }
}
