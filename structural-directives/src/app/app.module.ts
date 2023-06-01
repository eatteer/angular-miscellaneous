import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ParentDirective } from './directives/parent.directive';
import { ChildDirective } from './directives/child.directive';
import { SiblingDirective } from './directives/sibling.directive';
import { HideAfterDirective } from './directives/hide-after.directive';
import { ProvideDataDirective } from './directives/provide-data.directive';

@NgModule({
  declarations: [
    AppComponent,
    ParentDirective,
    ChildDirective,
    SiblingDirective,
    HideAfterDirective,
    ProvideDataDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
