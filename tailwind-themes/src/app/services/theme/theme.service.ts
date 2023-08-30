import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly htmlElement: HTMLElement = document.documentElement;

  private readonly localStorageThemeKey: string = 'theme';
  private readonly lightThemeClass: Theme = 'light';
  private readonly darkThemeClass: Theme = 'dark';

  private theme$!: BehaviorSubject<Theme>;

  public getTheme$(): Observable<Theme> {
    return this.theme$.asObservable();
  }

  public toggleTheme(): void {
    this.isLightTheme() ? this.setDarkTheme() : this.setLightTheme();
  }

  public isLightTheme(): boolean {
    return this.theme$.value === this.lightThemeClass;
  }

  public isDarkTheme(): boolean {
    return this.theme$.value === this.darkThemeClass;
  }

  public setDarkTheme(): void {
    this.htmlElement.classList.remove(this.lightThemeClass);
    this.htmlElement.classList.add(this.darkThemeClass);

    this.theme$.next(this.darkThemeClass);
    localStorage.setItem(this.localStorageThemeKey, this.darkThemeClass);
  }

  public setLightTheme(): void {
    this.htmlElement.classList.remove(this.darkThemeClass);
    this.htmlElement.classList.add(this.lightThemeClass);

    this.theme$.next(this.lightThemeClass);
    localStorage.setItem(this.localStorageThemeKey, this.lightThemeClass);
  }

  /**
   * Set the initial theme by initializing the {@link theme$} BehaviorSubject
   * inside {@link initializateTheme} method.
   *
   * This method is called by the APP_INITIALIZER provider in the app.module.ts file.
   */
  public initializateTheme(): void {
    this.theme$ = new BehaviorSubject<Theme>(this.getInitialTheme());
  }

  private getInitialTheme(): Theme {
    const themeInLocalStorage: string | null = localStorage.getItem(
      this.localStorageThemeKey
    );

    const initialTheme: string = themeInLocalStorage ?? this.lightThemeClass;

    this.htmlElement.classList.add(initialTheme);

    return initialTheme as Theme;
  }
}
