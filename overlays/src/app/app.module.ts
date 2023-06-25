import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { SelectComponent } from './components/select/select.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';

@NgModule({
  declarations: [AppComponent, SelectComponent, ToastComponent, ToastsContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
