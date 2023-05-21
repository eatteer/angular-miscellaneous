import { Component } from '@angular/core';
import { UsersMockService } from 'src/app/services/users-mock.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss'],
  /**
   * { provide: UsersService, useExisting: UsersMockService }
   *
   * When resolving a dependency using UsersService token, instead
   * use the UsersMockService token to resolve the dependency.
   *
   * The UsersMockService token resolves the existing UsersMockService dependency,
   * so does not create a new one
   */
  // providers: [{ provide: UsersService, useExisting: UsersMockService }],
})
export class TwoComponent {
  public constructor(private _usersService: UsersService) {
    (<any>window).twoComponentUsersService = this._usersService;
  }
}
