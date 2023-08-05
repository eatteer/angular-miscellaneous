import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignsFiltersFormComponent } from './campaigns-filters-form/campaigns-filters-form.component';
import { CampaingsComponent } from './pages/campaings/campaings.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';
import { HasKeysPipe } from './pipes/has-keys.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CampaignsFiltersFormComponent,
    CampaingsComponent,
    ObjectKeysPipe,
    HasKeysPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, NgbModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
