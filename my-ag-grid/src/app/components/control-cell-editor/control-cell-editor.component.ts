import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
export interface ControlCellEditorParams extends ICellEditorParams {
  form: FormGroup;
}
@Component({
  selector: 'app-control-cell-editor',
  templateUrl: './control-cell-editor.component.html',
  styleUrls: ['./control-cell-editor.component.scss'],
})
export class ControlCellEditorComponent implements ICellEditorAngularComp {
  /** Represents the column id as well as the control for the form */
  public colId!: string;

  /** Form */
  public form!: FormGroup;

  /** Control */
  public control!: FormControl;

  public agInit(params: ControlCellEditorParams): void {
    this.colId = params.colDef.colId!;
    this.form = params.form;
    this.control = params.form.get(this.colId)! as FormControl;

    // Configure control
    this.control.setValue(params.value);
  }

  public getValue() {
    return this.form.get(this.colId)?.value;
  }
}
