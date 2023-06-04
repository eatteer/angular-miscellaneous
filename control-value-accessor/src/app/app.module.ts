import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { ContinentSelectorComponent } from './components/continent-selector/continent-selector.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, ContinentSelectorComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
