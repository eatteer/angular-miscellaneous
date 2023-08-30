import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, switchMap, tap } from 'rxjs';
import { GetInfiniteAnimeQueryParams } from 'src/app/types/get-anime-params.interface';
import { InfiniteAnimeService } from 'src/app/services/infinite-anime/infinite-anime.service';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-infinite-anime',
  templateUrl: './infinite-anime.component.html',
  styleUrls: ['./infinite-anime.component.css'],
})
export class InfiniteAnimeComponent implements OnInit {
  public queryParams$ = new BehaviorSubject<GetInfiniteAnimeQueryParams>({
    q: '',
    limit: 20,
  });

  public queryControl = new FormControl<string>('', {
    nonNullable: true,
  });

  // Fetch animes when queryParams$ changes
  public animes$ = this.queryParams$.pipe(
    switchMap((params) => {
      return this.infiniteAnimeService.getInfiniteAnime(params).result$;
    })
  );

  public constructor(
    public loggerService: LoggerService,
    private infiniteAnimeService: InfiniteAnimeService
  ) {}

  public ngOnInit(): void {
    // Update queryParams$ when queryControl changes, this way animes will be fetched
    this.queryControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((query) => {
        this.queryParams$.next({
          ...this.queryParams$.value,
          q: query,
        });
      });
  }
}
