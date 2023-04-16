import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialNetworkSettingsComponent } from './components/social-network-settings/social-network-settings.component';

@NgModule({
  declarations: [AppComponent, SocialNetworkSettingsComponent],
  imports: [BrowserModule, NgbModule, ReactiveFormsModule, NgxErrorsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
