import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './pages/home/home.component';
import { GithubUserComponent } from './components/github-user/github-user.component';
import { FallbackUrlPipe } from './pipes/fallback-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HomeComponent,
    GithubUserComponent,
    FallbackUrlPipe,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
