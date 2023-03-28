import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormErrorContainerComponent } from './form-error-container/form-error-container.component';
import { FormErrorMessageComponent } from './form-error-message/form-error-message.component';

@NgModule({
  declarations: [AppComponent, FormComponent, FormErrorContainerComponent, FormErrorMessageComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
