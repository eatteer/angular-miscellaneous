import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionsRendererComponent } from './components/actions-renderer/actions-renderer.component';
import ControlRendererComponent from './components/control-renderer/control-renderer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailRendererComponent } from './components/email-renderer/email-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionsRendererComponent,
    ControlRendererComponent,
    EmailRendererComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AgGridModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
