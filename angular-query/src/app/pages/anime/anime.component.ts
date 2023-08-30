import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { GetAnimeQueryParams } from 'src/app/types/get-anime-params.interface';
import { AnimeService } from 'src/app/services/anime/anime.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  public queryParams$ = new BehaviorSubject<GetAnimeQueryParams>({
    q: '',
    limit: 10,
    page: 1,
  });

  public queryControl = new FormControl<string>('', {
    nonNullable: true,
  });

  public animes$ = this.queryParams$.pipe(
    switchMap((params) => {
      return this.animeService.getAnimes(params).result$;
    })
  );

  public constructor(private animeService: AnimeService) {}

  public ngOnInit(): void {
    this.queryControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.queryParams$.next({
          ...this.queryParams$.value,
          q: value,
        });
      });
  }

  public getPreviousPage(): void {
    this.queryParams$.next({
      ...this.queryParams$.value,
      page: this.queryParams$.value.page - 1,
    });
  }

  public getNextPage(): void {
    this.queryParams$.next({
      ...this.queryParams$.value,
      page: this.queryParams$.value.page + 1,
    });
  }
}
