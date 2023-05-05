import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface EditableRow {
  isEditing: boolean;
}

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}
export interface EditableUser extends User, EditableRow {}

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
})
export class FormTableComponent {
  public userOnEditionForm = this._fb.group({
    name: ['', [Validators.required]],
    age: [0, [Validators.required]],
    email: ['', [Validators.required]],
  });
  public users: EditableUser[] = [];

  public constructor(private _fb: FormBuilder) {}

  public ngOnInit(): void {
    const fetchedUsers: User[] = [
      { id: 1, name: 'John Smith', age: 25, email: 'john.smith@example.com' },
      { id: 2, name: 'Jane Doe', age: 30, email: 'jane.doe@example.com' },
      { id: 3, name: 'Bob Johnson', age: 40, email: 'bob.johnson@example.com' },
    ];

    this.users = fetchedUsers.map((fetchedUser) => {
      const user: EditableUser = {
        ...fetchedUser,
        isEditing: false,
      };
      return user;
    });
  }

  public setUserToEdit(user: EditableUser): void {
    this.users.forEach((currentUser) => {
      currentUser.isEditing = currentUser.id === user.id ? true : false;
    });

    const { id, isEditing, ...rest } = user;
    this.userOnEditionForm.setValue({ ...rest });
  }

  public unsetUserOnEdition(user: EditableUser): void {
    user.isEditing = false;
    this.userOnEditionForm.reset();
  }

  public saveUserChanges(user: EditableUser): void {
    Object.assign(user, this.userOnEditionForm.value);
    this.unsetUserOnEdition(user);
  }
}
