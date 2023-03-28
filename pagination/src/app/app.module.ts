import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [AppComponent, PaginationComponent, ListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
