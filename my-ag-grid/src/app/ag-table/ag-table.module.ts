import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionsRenderedComponent } from '../components/actions-rendered/actions-rendered.component';
import { ControlCellEditorComponent } from '../components/control-cell-editor/control-cell-editor.component';

@NgModule({
  declarations: [ActionsRenderedComponent, ControlCellEditorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ActionsRenderedComponent, ControlCellEditorComponent],
})
export class AgTableModule {}
