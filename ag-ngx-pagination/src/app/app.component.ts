import { Component } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import {
  DEFAULT_SORT_CONFIG,
  OPTIONS_SORT_CONFIG,
} from './lib/table/constants/table.consts';
import { Table } from './lib/table/types/table.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableService } from './lib/table/services/table/table.service';

export interface User {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TableService],
})
export class AppComponent {
  public table: Table<User> = {
    api: null,
    options: {
      ...OPTIONS_SORT_CONFIG,
      domLayout: 'autoHeight',
      defaultColDef: { ...DEFAULT_SORT_CONFIG, flex: 1 },
      columnDefs: [
        { headerName: 'Name', field: 'name', initialSort: 'desc' },
        { headerName: 'Username', field: 'username' },
        { headerName: 'Email', field: 'email' },
      ],
    },
    data: [],
    initialSort: { order: 'desc', orderBy: 'name' },
  };

  public constructor(
    private httpClient: HttpClient,
    private tableService: TableService
  ) {}

  public onGridReady(event: GridReadyEvent): void {
    this.table.api = event.api;
    this.registerTableFeatures();

    this.fetchUsers().subscribe({
      next: (users) => {
        this.table.data = users;
      },
      error: () => alert('Error'),
    });
  }

  private registerTableFeatures(): void {
    this.tableService.registerApi(this.table.api!);
    this.tableService.registerSort(this.table.initialSort!);
  }

  public fetchUsers(): Observable<User[]> {
    const endpoint = `https://jsonplaceholder.typicode.com/users?_start=0&_limit=10`;
    return this.httpClient.get<User[]>(endpoint);
  }
}
