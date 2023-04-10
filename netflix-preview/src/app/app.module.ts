import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PreviewComponent } from './components/preview/preview.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [AppComponent, PreviewComponent, CardComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
