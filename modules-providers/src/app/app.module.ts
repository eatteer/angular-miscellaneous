import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpsumService } from './services/ipsum/ipsum.service';
import { LoremModule } from './lorem/lorem.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LoremModule],
  providers: [IpsumService],
  bootstrap: [AppComponent],
})
export class AppModule {}
