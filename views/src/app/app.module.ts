import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoremComponent } from './components/lorem/lorem.component';
import { IpsumComponent } from './components/ipsum/ipsum.component';

@NgModule({
  declarations: [
    AppComponent,
    LoremComponent,
    IpsumComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
