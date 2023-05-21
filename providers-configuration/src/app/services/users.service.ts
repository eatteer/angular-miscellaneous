import { Injectable } from '@angular/core';
import { UsersMockService } from './users-mock.service';

@Injectable({
  providedIn: 'root',
  /**
   * { provide: UsersService, useExisting: UsersMockService }
   *
   * When resolving a dependency using UsersService token, instead
   * use the UsersMockService token to resolve the dependency.
   *
   * The UsersMockService token resolves the existing UsersMockService dependency,
   * so does not create a new one
   */
  // useExisting: UsersMockService,
})
export class UsersService {
  public constructor() {
    this.print();
  }

  public print(): void {
    console.log('UsersService');
  }
}
