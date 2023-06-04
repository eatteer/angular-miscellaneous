import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type ContinentValue = string;

export interface Continent {
  displayName: string;
  imageUrl: string;
  value: ContinentValue;
}

type OnChangeFn = (continent: ContinentValue) => {};
type OnTouchedFn = () => {};

const CONTINENTS: Continent[] = [
  {
    displayName: 'All',
    imageUrl: 'assets/south-america.png',
    value: '',
  },
  {
    displayName: 'Asia',
    imageUrl: 'assets/south-america.png',
    value: 'asia',
  },
  {
    displayName: 'Africa',
    imageUrl: 'assets/south-america.png',
    value: 'africa',
  },
  {
    displayName: 'North America',
    imageUrl: 'assets/south-america.png',
    value: 'northAmerica',
  },
  {
    displayName: 'South America',
    imageUrl: 'assets/south-america.png',
    value: 'southAmerica',
  },
  {
    displayName: 'Antarctica',
    imageUrl: 'assets/south-america.png',
    value: 'antarctica',
  },
  {
    displayName: 'Europe',
    imageUrl: 'assets/south-america.png',
    value: 'europe',
  },
  {
    displayName: 'Australia',
    imageUrl: 'assets/south-america.png',
    value: 'australia',
  },
];

@Component({
  selector: 'app-continent-selector',
  templateUrl: './continent-selector.component.html',
  styleUrls: ['./continent-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ContinentSelectorComponent,
      multi: true,
    },
  ],
})
export class ContinentSelectorComponent implements ControlValueAccessor {
  @Input()
  public continents: Continent[] = CONTINENTS;

  // Defined by value passed to form control
  public selectedContinent!: Continent;
  public shouldShowContinentOptions: boolean = false;

  // Defined by ControlValueAccessor registerOnChange
  public onChange!: OnChangeFn;
  // Defined by ControlValueAccessor registerOnTouched
  public onTouched!: OnTouchedFn;

  public constructor() {}

  public get areThereContinents(): boolean {
    return this.continents.length > 0;
  }

  private _setContinent(continent: ContinentValue): void {
    this.selectedContinent = this.continents.find(
      (current) => current.value === continent
    )!;
  }

  public selectContinent(continent: ContinentValue): void {
    this.onChange(continent);
    this.onTouched();

    this._setContinent(continent);
    this.toggleShowContinentOptions();
  }

  public toggleShowContinentOptions(): void {
    this.shouldShowContinentOptions = !this.shouldShowContinentOptions;
  }

  // CONTROL VALUE ACCESSOR METHODS

  public writeValue(continent: ContinentValue): void {
    this._setContinent(continent);
  }

  public registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}
}
