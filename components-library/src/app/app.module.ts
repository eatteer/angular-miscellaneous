import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectModule } from './library/select/select.module';
import { OffcanvasModule } from './library/offcanvas/offcanvas.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';
import { HttpClientModule } from '@angular/common/http';
import { ClearInputDirective } from './shared/directives/clear-input/clear-input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearTriggerComponent } from './library/clear-trigger/clear-trigger.component';

@NgModule({
  declarations: [AppComponent, ClearInputDirective, ClearTriggerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: '/assets/icons/icons.json',
    }),
    SelectModule,
    OffcanvasModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
