import { Component, Input } from '@angular/core';
import { Anime } from 'src/app/types/anime.interface';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent {
  @Input()
  public animes: Anime[] = [];
}
