import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: RadioComponent, multi: true },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  @Input()
  public value: any;

  @Input()
  public name!: string;

  public onChange!: (value: any) => void;
  public onTouched!: () => void;

  public isDisabled = false;

  /** @description model */
  public selectedValue: any;

  public onInputChange(_: Event): void {
    this.selectedValue = this.value;
    this.onChange(this.selectedValue);
  }

  public isChecked(): boolean {
    return this.selectedValue === this.value;
  }

  public writeValue(value: any): void {
    this.selectedValue = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
