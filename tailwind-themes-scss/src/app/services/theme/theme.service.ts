import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum ThemeEnum {
  LIGHT = 'tw-light',
  DARK = 'tw-dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly htmlElement: HTMLElement = document.documentElement;

  private readonly localStorageThemeKey: string = 'theme';
  private readonly defaultTheme: ThemeEnum = ThemeEnum.LIGHT;

  private theme$!: BehaviorSubject<ThemeEnum>;

  public getTheme$(): Observable<ThemeEnum> {
    return this.theme$.asObservable();
  }

  public toggleTheme(): void {
    this.isLightTheme() ? this.setDarkTheme() : this.setLightTheme();
  }

  public isLightTheme(): boolean {
    return this.theme$.value === ThemeEnum.LIGHT;
  }

  public isDarkTheme(): boolean {
    return this.theme$.value === ThemeEnum.DARK;
  }

  public setDarkTheme(): void {
    this.htmlElement.classList.remove(ThemeEnum.LIGHT);
    this.htmlElement.classList.add(ThemeEnum.DARK);

    this.theme$.next(ThemeEnum.DARK);
    localStorage.setItem(this.localStorageThemeKey, ThemeEnum.DARK);
  }

  public setLightTheme(): void {
    this.htmlElement.classList.remove(ThemeEnum.DARK);
    this.htmlElement.classList.add(ThemeEnum.LIGHT);

    this.theme$.next(ThemeEnum.LIGHT);
    localStorage.setItem(this.localStorageThemeKey, ThemeEnum.LIGHT);
  }

  /**
   * Set the initial theme by initializing the {@link theme$} BehaviorSubject
   * inside {@link initializateTheme} method.
   *
   * This method is called by the APP_INITIALIZER provider in the app.module.ts file.
   */
  public initializateTheme(): void {
    this.theme$ = new BehaviorSubject<ThemeEnum>(this.getInitialTheme());
  }

  private getInitialTheme(): ThemeEnum {
    const themeInLocalStorage: string | null = localStorage.getItem(
      this.localStorageThemeKey
    );

    const initialTheme: string = themeInLocalStorage ?? this.defaultTheme;

    this.htmlElement.classList.add(initialTheme);

    return initialTheme as ThemeEnum;
  }
}
