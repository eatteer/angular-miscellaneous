import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepComponent } from './components/step/step.component';

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    StepComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
