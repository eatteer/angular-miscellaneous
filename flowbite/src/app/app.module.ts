import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastsModule } from './core/toasts/toasts.module';
import { TooltipModule } from './core/tooltip/tooltip.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToastsModule, TooltipModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
