import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlertModule } from './alert/alert.module';
import { LoremComponent } from './lorem/lorem.component';
import { IpsumComponent } from './ipsum/ipsum.component';

@NgModule({
  declarations: [AppComponent, LoremComponent, IpsumComponent],
  imports: [BrowserModule, AlertModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
