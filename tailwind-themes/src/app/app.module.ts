import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme/theme.service';

const THEME_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (themeService: ThemeService) => () => {
    return themeService.initializateTheme();
  },
  deps: [ThemeService],
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [THEME_INITIALIZER],
  bootstrap: [AppComponent],
})
export class AppModule {}
