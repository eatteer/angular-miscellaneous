import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValueObjectDirective } from './directives/form-value-object/form-value-object.directive';
import { ArrayPipe } from './pipes/array/array.pipe';

@NgModule({
  declarations: [AppComponent, FormValueObjectDirective, ArrayPipe],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
