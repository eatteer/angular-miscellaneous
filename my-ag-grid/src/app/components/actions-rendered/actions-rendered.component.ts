import { Component } from '@angular/core';
import {
  ICellRendererParams,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
  RowValueChangedEvent,
} from 'ag-grid-community';
import { EditableTablePageComponent } from 'src/app/pages/editable-table-page/editable-table-page.component';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-actions',
  templateUrl: './actions-rendered.component.html',
  styleUrls: ['./actions-rendered.component.scss'],
})
export class ActionsRenderedComponent {
  public initialData!: User;

  public params!: ICellRendererParams<User>;
  public rowIndex!: number;
  public isEditing: boolean = false;
  public isEdited: boolean = false;

  public constructor(private _editableTablePage: EditableTablePageComponent) {
    this._editableTablePage.undoAllChanges$.subscribe((_) => {
      this.undo();
    });
  }

  public agInit(params: ICellRendererParams<User>): void {
    this.params = params;
    this.initialData = JSON.parse(JSON.stringify(this.params.data!));
    this.rowIndex = this.params.rowIndex;
    this._setEventListeners();
  }

  public edit(): void {
    this.params.api.setFocusedCell(this.params.rowIndex, 'name');
    this.params.api.startEditingCell({
      rowIndex: this.params.rowIndex,
      colKey: 'name',
    });
  }

  public save(): void {
    this.params.api.stopEditing();
  }

  public cancel(): void {
    this.params.api.stopEditing(true);
  }

  public undo(): void {
    this.params.node.setData(this.initialData);
    this.isEdited = false;
  }

  /**
   * Set event listeners for:
   *
   * - rowEditingStarted - The user has started to edit a row
   *
   * - rowEditingStopped - The user has stopped to edit a row
   *
   * - rowValueChanged - The user has edited a row
   */
  private _setEventListeners(): void {
    // rowEditingStarted
    this.params.api.addEventListener(
      'rowEditingStarted',
      (event: RowEditingStartedEvent<User>) => {
        if (this.rowIndex === event.rowIndex) {
          this.isEditing = true;
        }
      }
    );

    // rowEditingStopped
    this.params.api.addEventListener(
      'rowEditingStopped',
      (event: RowEditingStoppedEvent<User>) => {
        if (this.rowIndex === event.rowIndex) {
          this.isEditing = false;
        }
      }
    );

    // rowValueChanged
    this.params.api.addEventListener(
      'rowValueChanged',
      (event: RowValueChangedEvent<User>) => {
        if (this.rowIndex === event.rowIndex) {
          this.isEdited = true;
        }
      }
    );
  }
}
