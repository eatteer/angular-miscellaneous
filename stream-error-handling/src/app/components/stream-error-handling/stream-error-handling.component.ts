import { Component } from '@angular/core';
import { catchError, ignoreElements, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { JsonPlaceholderService } from '../../services/json-placeholder.service';

@Component({
  selector: 'app-stream-error-handling',
  templateUrl: './stream-error-handling.component.html',
  styles: [],
})
export class StreamErrorHandlingComponent {
  public user$ = this.usersService.getUserWithError();
  public userError$ = this.user$.pipe(
    ignoreElements(), // Ignore emissions
    catchError((error) => of(error))
  );

  public placeholderUsers$ = this.jsonPlaceholderService.getUsers();
  public placeholderUsersError$ = this.placeholderUsers$.pipe(
    ignoreElements(), // Ignore emissions
    catchError((error) => of(error))
  );

  public constructor(
    private usersService: UsersService,
    private jsonPlaceholderService: JsonPlaceholderService
  ) {}
}
