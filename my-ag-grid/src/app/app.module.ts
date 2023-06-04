import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditableTablePageComponent } from './pages/editable-table-page/editable-table-page.component';
import { ActionsRenderedComponent } from './components/actions-rendered/actions-rendered.component';
import { ControlCellEditorComponent } from './components/control-cell-editor/control-cell-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersTableComponent } from './tables/users-table/users-table.component';

@NgModule({
  declarations: [
    AppComponent,
    EditableTablePageComponent,
    ActionsRenderedComponent,
    ControlCellEditorComponent,
    UsersTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
