import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditableTablePageComponent } from './pages/editable-table-page/editable-table-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersTableComponent } from './tables/photos-table/photos-table.component';
import { AgTableModule } from './ag-table/ag-table.module';

@NgModule({
  declarations: [AppComponent, EditableTablePageComponent, UsersTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
