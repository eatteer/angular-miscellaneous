import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  NavigateToNextCellParams,
  TabToNextCellParams,
} from 'ag-grid-community';
import { ActionsRendererComponent } from './components/actions-renderer/actions-renderer.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import ControlRendererComponent, {
  ControlRendererParams,
} from './components/control-renderer/control-renderer.component';
import {
  EmailRendererComponent,
  EmailRendererParams,
} from './components/email-renderer/email-renderer.component';

export interface User {
  id: number;
  username: string;
  email: string;
  address: string;
}

export interface EditableUser extends User {
  form: FormSchema; // Whole form
  group: EditableUserGroup; // Specific group inside form array
}

export type EditableUserGroup = FormGroup<{
  username: FormControl<string>;
  email: FormControl<string>;
}>;

export type FormSchema = FormGroup<{
  editableUsers: FormArray<EditableUserGroup | any>;
}>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public users: User[] = [
    {
      id: 1,
      username: 'debviluke',
      email: 'eatteer@gmail.com',
      address: 'Lorem',
    },
    {
      id: 2,
      username: 'vikler',
      email: 'vikler@gmail.com',
      address: 'Ipsum',
    },
  ];

  public editableUsers: EditableUser[] = [];

  public usersTable = {
    api: {} as GridApi,
    gridOptions: {
      domLayout: 'autoHeight',
      rowHeight: 50,
    } as GridOptions<User>,
    defaultColDef: {
      flex: 1,
      cellClass: ['flex', 'items-center'],
    } as ColDef<User>,
    columnDefs: [
      { headerName: 'Actions', cellRenderer: ActionsRendererComponent },
      { headerName: 'ID', field: 'id' },
      { headerName: 'Username', field: 'username' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Address', field: 'address' },
    ] as ColDef<User>[],
  };

  public editableUsersTable = {
    api: {} as GridApi,
    gridOptions: {
      domLayout: 'autoHeight',
      rowHeight: 50,
    } as GridOptions<EditableUser>,
    defaultColDef: {
      flex: 1,
      sortable: true,
      cellClass: ['flex', 'items-center'],
    } as ColDef<EditableUser>,
    columnDefs: [
      { headerName: 'Actions', cellRenderer: ActionsRendererComponent },
      { headerName: 'ID', field: 'id' },
      {
        headerName: 'Username',
        field: 'username',
        cellRenderer: ControlRendererComponent,
        cellRendererParams: {
          controlName: 'username',
        } as ControlRendererParams,
      },
      {
        headerName: 'Email',
        field: 'email',
        cellRenderer: EmailRendererComponent,
        cellRendererParams: {
          controlName: 'email',
        } as EmailRendererParams,
      },
      { headerName: 'Address', field: 'address' },
    ] as ColDef[], // ColDef<EditableUser>[]
  };

  public form!: FormSchema;

  public constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      editableUsers: this.fb.array([]),
    });
  }

  public onUsersGridReady(event: GridReadyEvent): void {
    this.usersTable.api = event.api;
    this.usersTable.api.setRowData(this.users);
  }

  public onEditableUsersGridReady(event: GridReadyEvent): void {
    this.editableUsersTable.api = event.api;
    this.editableUsersTable.api.setRowData([]);
  }

  public addUserForEditing(user: User): void {
    const editableUserGroup: EditableUserGroup = this.fb.group({
      username: this.fb.control(user.username),
      email: this.fb.control(user.email),
    });

    const editableUser: EditableUser = {
      ...user,
      form: this.form,
      group: editableUserGroup,
    };

    this.editableUsersFormArray.push(editableUserGroup);
    this.editableUsers.push(editableUser);
    this.editableUsersTable.api.setRowData([...this.editableUsers]);
  }

  private get editableUsersFormArray() {
    return this.form.controls.editableUsers;
  }
}
