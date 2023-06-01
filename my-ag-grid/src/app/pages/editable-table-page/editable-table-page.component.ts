import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowValueChangedEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ActionsRenderedComponent } from 'src/app/components/actions-rendered/actions-rendered.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-editable-table-page',
  templateUrl: './editable-table-page.component.html',
  styleUrls: ['./editable-table-page.component.scss'],
})
export class EditableTablePageComponent implements AfterViewInit {
  @ViewChild(AgGridAngular)
  public agGrid!: AgGridAngular;

  public defaultColDef: ColDef = {
    editable: true,
  };

  public columnDefs: ColDef[] = [
    {
      field: 'actions',
      /**
       * ActionsComponent define handlers for:
       * - rowEditingStarted
       * - rowEditingStopped
       * - rowValueChanged
       */
      cellRenderer: ActionsRenderedComponent,
      editable: false,
    },
    { field: 'name' },
    { field: 'username' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'website' },
  ];

  public undoAllChanges$: Subject<void> = new Subject();

  public users$ = this._usersService.getUsers();

  public changedUsers: User[] = [];

  public constructor(private _usersService: UsersService) {}

  public undoAllChanges(): void {
    this.undoAllChanges$.next();
    this.changedUsers = [];
  }

  public ngAfterViewInit(): void {
    this.agGrid.api.addEventListener(
      'rowValueChanged',
      (event: RowValueChangedEvent<User>) => {
        const index = this.changedUsers.findIndex(
          (user) => user.id === event.data?.id
        );
        if (index) {
          this.changedUsers.splice(index, 1, event.data!);
        }
      }
    );
  }
}
