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
import { PaginatorComponent } from 'src/app/ag-table/components/paginator/paginator.component';
import { Photo } from 'src/app/types/photo.type';
import { GetPaginationParams } from 'src/app/ag-table/ag-grid.types';

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
  @ViewChild(PaginatorComponent)
  private paginator!: PaginatorComponent;

  private api!: GridApi;

  public gridOptions: GridOptions = {
    suppressMultiSort: true,
    domLayout: 'autoHeight',
  };

  public photos: Photo[] = [];

  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private photosService: PhotosService,
    private agTableService: AgTableService,
    private editableAgTableService: EditableAgTableService
  ) {}

  public gridReady(event: GridReadyEvent): void {
    this.api = event.api;

    this.registerTableFeatures();
    this.configureEditableRows();
    this.configureDefaultColDef();
    this.configureColumnsDef();

    this.fetchPhotosFirstTime();
    this.fetchPhotosOnChanges();
  }

  public undoAllChanges(): void {
    this.editableAgTableService.undoAllChanges$.next();
  }

  public fetchPhotosOnFormChanges(): void {
    const payload = this.getRequestPayload({ forPage: 1 });
    console.log(payload);
    this.photosService.getPhotos().subscribe((response) => {
      const { data, count } = response;
      this.photos = data;
      this.agTableService.setPaginatorConfig({
        page: 1,
        totalItems: count,
        itemsPerPage: 10,
      });
    });
  }

  private fetchPhotosFirstTime(): void {
    const payload = this.getRequestPayload();
    console.log(payload);
    this.photosService.getPhotos().subscribe((response) => {
      const { data, count } = response;
      this.photos = data;
      this.agTableService.registerPaginator(this.paginator, {
        page: 1,
        totalItems: count,
        itemsPerPage: 10,
      });
    });
  }

  private fetchPhotosOnChanges(): void {
    const combined$ = this.agTableService.createCombineForSortAndPagination();

    combined$.subscribe((_) => {
      const payload = this.getRequestPayload();
      console.log(payload);
      this.photosService.getPhotos().subscribe((response) => {
        const { data } = response;
        this.photos = data;
      });
    });
  }

  private getRequestPayload({ forPage, limit }: GetPaginationParams = {}) {
    const sort = this.agTableService.getSort();
    const page = this.agTableService.getPagination({ forPage });
    return { sort, page };
  }

  private registerTableFeatures(): void {
    this.agTableService.registerApi(this.api);
    this.agTableService.registerSort({ order: 'desc', orderBy: 'title' });
  }

  private configureEditableRows(): void {
    const form = this.formBuilder.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
    });

    this.editableAgTableService.setForm(form);
  }

  private configureDefaultColDef(): void {
    this.api.setDefaultColDef({
      flex: 1,
      autoHeight: true,
      resizable: true,
      editable: true,
      sortable: true,
      comparator: () => 0,
      sortingOrder: ['asc', 'desc'],
      cellEditor: ControlCellEditorComponent,
      cellEditorParams: {
        form: this.editableAgTableService.getForm(),
      } as ControlCellEditorParams,
    });
  }

  private configureColumnsDef(): void {
    this.api.setColumnDefs([
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
