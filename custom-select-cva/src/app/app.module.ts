import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { GroupCustomSelectComponent } from './components/group-custom-select/group-custom-select.component';

@NgModule({
  declarations: [AppComponent, CustomSelectComponent, GroupCustomSelectComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
