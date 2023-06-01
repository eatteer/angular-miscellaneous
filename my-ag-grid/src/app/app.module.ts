import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditableTablePageComponent } from './pages/editable-table-page/editable-table-page.component';
import { ActionsRenderedComponent } from './components/actions-rendered/actions-rendered.component';

@NgModule({
  declarations: [
    AppComponent,
    EditableTablePageComponent,
    ActionsRenderedComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AgGridModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
