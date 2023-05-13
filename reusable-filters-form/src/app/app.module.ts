import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersFormComponent } from './filters-form/filters-form.component';
import { CampaingsPageComponent } from './pages/campaings-page/campaings-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';
import { HasKeysPipe } from './pipes/has-keys.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, FiltersFormComponent, CampaingsPageComponent, ObjectKeysPipe, HasKeysPipe],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, NgbModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
