import { Component, Input } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input()
  public rowData: Report[] = [];

  public gridApi!: GridApi;

  public gridOptions: GridOptions = {
    domLayout: 'autoHeight',
  };

  public defaultColDef: ColDef = {
    sortable: true,
  };

  public columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Date',
      field: 'date',
    },
    {
      headerName: 'Campaign',
      field: 'campaign',
    },
  ];

  public onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }
}
