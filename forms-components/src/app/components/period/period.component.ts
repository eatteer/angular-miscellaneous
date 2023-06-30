import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type DatePeriod = 'month' | 'today' | 'yesterday';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: PeriodComponent, multi: true },
  ],
})
export class PeriodComponent implements ControlValueAccessor {
  public defaultValue?: DatePeriod;
  public value?: DatePeriod;
  public firstTimeValue = true;

  public isDisabled = false;

  public onChange!: (value: DatePeriod) => void;
  public onTouched!: () => void;

  public writeValue(value: DatePeriod): void {
    if (this.firstTimeValue) {
      this.defaultValue = value;
      this.firstTimeValue = false;
    }
    this.value = value;
  }

  public registerOnChange(fn: (DatePeriod: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onSelectChange(value: string): void {
    this.onChange(value as DatePeriod);
  }
}
