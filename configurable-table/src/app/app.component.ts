import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public gridApi!: GridApi;
  public columApi!: ColumnApi;

  public gridOptions: GridOptions = {
    domLayout: 'autoHeight',
  };

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
  };

  public columnDefs: ColDef[] = [
    { field: 'id', minWidth: 80 },
    { field: 'name' },
    { field: 'username' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'website' },
    { field: 'address.street' },
    { field: 'address.suite' },
    { field: 'address.city' },
    { field: 'address.zipcode' },
  ];

  public rowData$ = new BehaviorSubject<User[]>([]);

  public columsToShowOnMobile = ['id', 'name', 'email', 'phone'];

  public columnsModeControl = new FormControl(true);

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly breakpointObserver: BreakpointObserver
  ) {}

  public onGridReady(event: GridReadyEvent): void {
    this.configureGridApis(event);
    this.getUsers();
    this.changeColumnsVisibilityOnBreakpointChange();
    this.changeColumnsVisibilityOnColumnsModeControlChange();
  }

  private configureGridApis(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.columApi = event.columnApi;
  }

  private getUsers(): void {
    this.httpClient
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((users) => {
        this.rowData$.next(users);
      });
  }

  private changeColumnsVisibilityOnBreakpointChange(): void {
    const mediaQuery = '(min-width: 1024px)';
    this.breakpointObserver.observe([mediaQuery]).subscribe((result) => {
      const isDesktop = result.breakpoints[mediaQuery];
      if (isDesktop) {
        this.columnsModeControl.setValue(false);
        this.showAllColumns();
      } else {
        this.columnsModeControl.setValue(true);
        this.showOnlyColumns(this.columsToShowOnMobile);
      }
    });
  }

  private changeColumnsVisibilityOnColumnsModeControlChange(): void {
    this.columnsModeControl.valueChanges.subscribe((value) => {
      if (value) this.showOnlyColumns(this.columsToShowOnMobile);
      else this.showAllColumns();
    });
  }

  private showOnlyColumns(columns: string[]): void {
    this.columApi.getColumns()!.forEach((column) => {
      const shouldShowColumn = columns.includes(column.getColId());
      this.columApi.setColumnVisible(column, shouldShowColumn);
    });
  }

  private showAllColumns(): void {
    this.columApi.setColumnsVisible(this.columApi.getColumns()!, true);
  }
}
