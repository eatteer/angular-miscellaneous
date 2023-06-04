import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ICellRendererParams,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
  RowValueChangedEvent,
} from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { EditableTablePageComponent } from 'src/app/pages/editable-table-page/editable-table-page.component';
import { EditableAgTableService } from 'src/app/services/editable-ag-table.service';
import { ObjectsService } from 'src/app/services/objects.service';
import { AGridEventListener } from 'src/app/types/ag-grid.types';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-actions',
  templateUrl: './actions-rendered.component.html',
  styleUrls: ['./actions-rendered.component.scss'],
})
export class ActionsRenderedComponent implements OnDestroy {
  public form = this._editableAgTableService.getForm();

  public initialData!: User;

  public renderedParams!: ICellRendererParams<User>;
  public rowIndex!: number;
  public isEditing: boolean = false;
  public isEdited: boolean = false;

  /** Subscriptions */
  private _subscriptions: Subscription[] = [];

  /** Listeners */
  private _agGridListeners: AGridEventListener[] = [];

  public constructor(
    private _editableAgTableService: EditableAgTableService,
    private _objectsService: ObjectsService
  ) {
    const subscription = this._editableAgTableService.undoAllChanges$.subscribe(
      (_) => {
        this.undo();
      }
    );
    this._subscriptions.push(subscription);
  }

  public agInit(params: ICellRendererParams<User>): void {
    this.renderedParams = params;
    this.initialData = this._objectsService.clone(this.renderedParams.data!);
    this.rowIndex = this.renderedParams.rowIndex;
    this._setEventListeners();
  }

  public edit(): void {
    this.renderedParams.api.setFocusedCell(
      this.renderedParams.rowIndex,
      'name'
    );
    this.renderedParams.api.startEditingCell({
      rowIndex: this.renderedParams.rowIndex,
      colKey: 'name',
    });
  }

  public save(): void {
    this.renderedParams.api.stopEditing();
  }

  public cancel(): void {
    this.renderedParams.api.stopEditing(true);
  }

  public undo(): void {
    this.renderedParams.node.setData(this.initialData);
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
    const rowEditingStarted = (event: RowEditingStartedEvent<User>) => {
      if (this.rowIndex === event.rowIndex) {
        this.isEditing = true;
      }
    };

    this.renderedParams.api.addEventListener(
      'rowEditingStarted',
      rowEditingStarted
    );

    // rowEditingStopped
    const rowEditingStopped = (event: RowEditingStoppedEvent<User>) => {
      if (this.rowIndex === event.rowIndex) {
        this.isEditing = false;
      }
    };
    this.renderedParams.api.addEventListener(
      'rowEditingStopped',
      rowEditingStopped
    );

    // rowValueChanged
    const rowValueChanged = (event: RowValueChangedEvent<User>) => {
      if (this.rowIndex === event.rowIndex) {
        this.isEdited = true;
      }
    };
    this.renderedParams.api.addEventListener(
      'rowValueChanged',
      rowValueChanged
    );

    // Push listeners
    const listeners = [
      { eventType: 'rowEditingStarted', listener: rowEditingStarted },
      { eventType: 'rowEditingStopped', listener: rowEditingStopped },
      { eventType: 'rowValueChanged', listener: rowValueChanged },
    ];
    this._agGridListeners.push(...listeners);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });

    this._agGridListeners.forEach((agridListener) => {
      const { eventType, listener } = agridListener;
      this.renderedParams.api.removeEventListener(eventType, listener);
    });
  }
}
