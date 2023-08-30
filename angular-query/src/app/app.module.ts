import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { QUERY_DEVTOOLS_PROVIDER } from './providers/query-devtools';
import { AnimeComponent } from './pages/anime/anime.component';
import { IsRefreshingPipe } from './pipes/is-refreshing/is-refreshing.pipe';
import { PhotosComponent } from './pages/photos/photos.component';
import { PhotosListComponent } from './pages/photos/components/photos-list/photos-list.component';
import { AnimeListComponent } from './pages/anime/components/anime-list/anime-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteAnimeComponent } from './pages/infinite-anime/infinite-anime.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BooleanPipe } from './pipes/boolean/boolean.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IsRefreshingPipe,
    HomeComponent,
    PhotosComponent,
    PhotosListComponent,
    AnimeComponent,
    AnimeListComponent,
    InfiniteAnimeComponent,
    BooleanPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [QUERY_DEVTOOLS_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
