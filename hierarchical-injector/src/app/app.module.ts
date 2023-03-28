import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DummyComponent } from './dummy/dummy.component';
import { DummyDirective } from './dummy.directive';
import { Dummy2Directive } from './dummy2.directive';
import { DummyService } from './dummy.service';
import { DisabledIfDirective } from './disabled-if.directive';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    DummyDirective,
    Dummy2Directive,
    DisabledIfDirective,
    FormComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [DummyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
