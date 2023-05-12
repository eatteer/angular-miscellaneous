import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import { LoremComponent } from './components/lorem/lorem.component';

@NgModule({
  declarations: [AppComponent, LoremComponent],
  imports: [BrowserModule, PortalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
