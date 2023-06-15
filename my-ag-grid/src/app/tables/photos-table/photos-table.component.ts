import { Component, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ActionsRenderedComponent } from 'src/app/components/actions-rendered/actions-rendered.component';
import {
  ControlCellEditorComponent,
  ControlCellEditorParams,
} from 'src/app/components/control-cell-editor/control-cell-editor.component';
import { PhotosService } from 'src/app/services/photos.service';
import { AgTableService } from 'src/app/ag-table/services/ag-table.service';
import { EditableAgTableService } from 'src/app/ag-table/services/editable-ag-table.service';
import { PaginationComponent } from 'src/app/ag-table/components/paginator/paginator.component';
import { Photo } from 'src/app/types/photo.type';
import { combineLatest, skip, tap } from 'rxjs';

/**
 * USAGE
 * 1. Provide AgTableService, EditableAgTableService
 * 2. Register Grid API on AgTableService
 * 3. Register Sort on AgTableService
 * 4. Register Paginator on AgTableService on first fetch
 * 5. Configure editable rows by matching column definitions and form controls
 * 6. Configure default column definition
 * 7. Configure columns definitions
 */

@Component({
  selector: 'app-photos-table',
  templateUrl: './photos-table.component.html',
  styleUrls: ['./photos-table.component.scss'],
  providers: [AgTableService, EditableAgTableService],
})
export class UsersTableComponent {
  @ViewChild(PaginationComponent)
  public paginator!: PaginationComponent;

  public gridApi!: GridApi;

  public gridOptions: GridOptions = {
    suppressMultiSort: true,
    domLayout: 'autoHeight',
  };

  public photos: Photo[] = [];

  public constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _photosService: PhotosService,
    private _agTableService: AgTableService,
    private _editableAgTableService: EditableAgTableService
  ) {}

  public gridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;

    this._registerTableOnAgTableService();
    this._configureEditableRows();
    this._configureDefaultColDef();
    this._configureColumnsDef();

    this._initialFetch();
    this._fetchPhotosOnChanges();
  }

  public undoAllChanges(): void {
    this._editableAgTableService.undoAllChanges$.next();
  }

  public fetchPhotosCauseForm(): void {
    const payload = this._getPayload(1);
    console.log(payload);
    this._photosService.getPhotos().subscribe((response) => {
      const { data, count } = response;
      this.photos = data;
      this._agTableService.setPaginationConfig(
        {
          page: 1,
          totalItems: count,
          itemsPerPage: 10,
        },
        false
      );
    });
  }

  private _initialFetch(): void {
    const payload = this._getPayload();
    console.log(payload);
    this._photosService.getPhotos().subscribe((response) => {
      const { data, count } = response;
      this.photos = data;
      this._agTableService.registerPagination(this.paginator, {
        page: 1,
        totalItems: count,
        itemsPerPage: 10,
      });
    });
  }

  private _fetchPhotosOnChanges(): void {
    const combined$ = this._agTableService.createCombineForSortAndPagination();

    combined$.subscribe((_) => {
      const payload = this._getPayload();
      console.log(payload);
      this._photosService.getPhotos().subscribe((response) => {
        const { data } = response;
        this.photos = data;
      });
    });
  }

  private _getPayload(currentPage?: number) {
    const sort = this._agTableService.getSort();
    const page = this._agTableService.getPagination(currentPage);
    return { sort, page };
  }

  private _registerTableOnAgTableService(): void {
    this._agTableService.registerApi(this.gridApi);
    this._agTableService.registerSort({ order: 'desc', orderBy: 'title' });
  }

  private _configureEditableRows(): void {
    const form = this._formBuilder.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
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
        headerName: 'Actions',
        colId: 'actions',
        field: 'actions',
        editable: false,
        sortable: false,
        cellRenderer: ActionsRenderedComponent,
        cellEditor: undefined,
      },
      {
        headerName: 'Album ID',
        colId: 'albumId',
        field: 'albumId',
        editable: false,
      },
      { headerName: 'ID', colId: 'id', field: 'id', editable: false },
      {
        headerName: 'Title',
        colId: 'title',
        field: 'title',
        initialSort: 'desc',
      },
      { headerName: 'URL', colId: 'url', field: 'url' },
      {
        headerName: 'Thumbnail URL',
        colId: 'thumbnailUrl',
        field: 'thumbnailUrl',
        resizable: false,
      },
    ]);
  }
}