import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsModule } from './modules/icons/icons.module';
import { IonicModule } from '@ionic/angular';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [AppComponent, UserPageComponent, ProfilePageComponent],
  imports: [BrowserModule, AppRoutingModule, IconsModule, IonicModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
