import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AnimeComponent } from './pages/anime/anime.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { InfiniteAnimeComponent } from './pages/infinite-anime/infinite-anime.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'photos',
    component: PhotosComponent,
  },
  {
    path: 'anime',
    component: AnimeComponent,
  },
  {
    path: 'infinite-anime',
    component: InfiniteAnimeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
