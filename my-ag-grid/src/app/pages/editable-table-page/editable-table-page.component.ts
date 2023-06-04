import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridOptions,
  RowValueChangedEvent,
  SortChangedEvent,
} from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ActionsRenderedComponent } from 'src/app/components/actions-rendered/actions-rendered.component';
import { TablesService } from 'src/app/services/tables.service';
import { UsersService } from 'src/app/services/users.service';
import { Sort } from 'src/app/types/params.types';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-editable-table-page',
  templateUrl: './editable-table-page.component.html',
  styleUrls: ['./editable-table-page.component.scss'],
})
export class EditableTablePageComponent implements AfterViewInit {
  @ViewChild(AgGridAngular)
  public agGrid!: AgGridAngular;

  public gridOptions: GridOptions = {
    suppressMultiSort: true,
    domLayout: 'autoHeight',
  };

  public defaultColDef: ColDef = {
    flex: 1,
    autoHeight: true,
    resizable: true,
    editable: true,
    sortable: true,
    comparator: () => 0,
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
      sortable: false,
    },
    { field: 'name' },
    { field: 'username' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'website', resizable: false },
  ];

  public undoAllChanges$: Subject<void> = new Subject();

  public users$ = this._usersService.getUsers();

  public changedUsers: User[] = [];

  public currentSort: Sort = this._tablesService.nullSort;

  public constructor(
    private _usersService: UsersService,
    private _tablesService: TablesService
  ) {}

  public sortChanged(event: SortChangedEvent): void {
    this.currentSort = this._tablesService.createSort(event);
  }

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
