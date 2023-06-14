import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionsRenderedComponent } from '../components/actions-rendered/actions-rendered.component';
import { ControlCellEditorComponent } from '../components/control-cell-editor/control-cell-editor.component';
import { PaginationComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    ActionsRenderedComponent,
    ControlCellEditorComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgbPaginationModule],
  exports: [
    ActionsRenderedComponent,
    ControlCellEditorComponent,
    PaginationComponent,
  ],
})
export class AgTableModule {}
