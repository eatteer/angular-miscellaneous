import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectModule } from './library/select/select.module';
import { OffcanvasModule } from './library/offcanvas/offcanvas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SelectModule, OffcanvasModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
