import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { EditableTableComponent } from './components/editable-table/editable-table.component';

@NgModule({
  declarations: [AppComponent, EditableTableComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
