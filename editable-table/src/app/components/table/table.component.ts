import { Component, OnInit } from '@angular/core';

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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public userOnEdition: EditableUser | null = null;
  public users: EditableUser[] = [];

  public ngOnInit(): void {
    const fetchedUsers: User[] = [
      { id: 1, name: 'John Smith', age: 25, email: 'john.smith@example.com' },
      { id: 2, name: 'Jane Doe', age: 30, email: 'jane.doe@example.com' },
      { id: 3, name: 'Bob Johnson', age: 40, email: 'bob.johnson@example.com' },
    ];

    this.users = fetchedUsers.map((_user) => {
      const user: EditableUser = {
        ..._user,
        isEditing: false,
      };
      return user;
    });
  }

  public setUserToEdit(user: EditableUser): void {
    this.users.forEach((currentUser) => {
      currentUser.isEditing = currentUser.id === user.id ? true : false;
    });

    // Edit a copy of the user (Not same reference)
    // So the original user is not modified until the
    // changes are saved
    this.userOnEdition = { ...user };
  }

  public unsetUserOnEdition(user: EditableUser): void {
    user.isEditing = false;
    this.userOnEdition = null;
  }

  public saveUser(user: EditableUser): void {
    // Modify the original user (Same reference)
    Object.assign(user, this.userOnEdition);
    this.unsetUserOnEdition(user);
  }
}
