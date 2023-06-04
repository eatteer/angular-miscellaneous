import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ActionsRenderedComponent } from 'src/app/components/actions-rendered/actions-rendered.component';
import {
  ControlCellEditorComponent,
  ControlCellEditorParams,
} from 'src/app/components/control-cell-editor/control-cell-editor.component';
import { UsersService } from 'src/app/services/users.service';
import { AgTableService } from 'src/app/services/ag-table.service';
import { EditableAgTableService } from 'src/app/services/editable-ag-table.service';
import { Sort } from 'src/app/types/params.types';

@Component({
  selector: 'app-editable-table-page',
  templateUrl: './editable-table-page.component.html',
  styleUrls: ['./editable-table-page.component.scss'],
  providers: [AgTableService, EditableAgTableService],
})
export class EditableTablePageComponent {
  public gridApi!: GridApi;

  public gridOptions: GridOptions = {
    suppressMultiSort: true,
    domLayout: 'autoHeight',
  };

  public users$ = this._usersService.getUsers();
  public sort$: BehaviorSubject<Sort> = this._agTableService.sort$;

  public constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _usersService: UsersService,
    private _agTableService: AgTableService,
    private _editableAgTableService: EditableAgTableService
  ) {}

  public gridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this._registerGridApiForAgTableService();
    this._configureEditableRows();
    this._configureDefaultColDef();
    this._configureColumnsDef();
  }

  public undoAllChanges(): void {
    this._editableAgTableService.undoAllChanges$.next();
  }

  private _registerGridApiForAgTableService(): void {
    this._agTableService.registerAgGridApi(this.gridApi);
  }

  private _configureEditableRows(): void {
    const form = this._formBuilder.group({
      name: ['', [Validators.required]],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: [''],
    });

    this._editableAgTableService.setForm(form);
  }

  private _configureDefaultColDef(): void {
    this.gridApi.setDefaultColDef({
      flex: 1,
      autoHeight: true,
      resizable: true,
      editable: true,
      sortable: true,
      comparator: () => 0,
      cellEditor: ControlCellEditorComponent,
      cellEditorParams: {
        form: this._editableAgTableService.getForm(),
      } as ControlCellEditorParams,
    });
  }

  private _configureColumnsDef(): void {
    this.gridApi.setColumnDefs([
      {
        colId: 'actions',
        field: 'actions',
        editable: false,
        sortable: false,
        cellRenderer: ActionsRenderedComponent,
        cellEditor: undefined,
      },
      {
        colId: 'name',
        field: 'name',
      },
      { colId: 'username', field: 'username' },
      { colId: 'email', field: 'email' },
      { colId: 'phone', field: 'phone' },
      { colId: 'website', field: 'website', resizable: false },
    ]);
  }
}
