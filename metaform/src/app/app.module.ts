import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { SelectModule } from './components/select/select.module';
import { RadioModule } from './components/radio/radio.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    SelectModule,
    RadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
