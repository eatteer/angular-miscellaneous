import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChecksFormPageComponent } from './pages/checks-form-page/checks-form-page.component';
import { ChecksFormComponent } from './pages/components/checks-form/checks-form.component';

@NgModule({
  declarations: [AppComponent, ChecksFormPageComponent, ChecksFormComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
