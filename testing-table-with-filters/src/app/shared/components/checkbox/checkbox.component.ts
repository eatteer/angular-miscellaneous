import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input()
  public value: any;

  @Output()
  public onChecked: EventEmitter<any> = new EventEmitter();

  public onChange!: (value: any) => void;
  public onTouched!: () => void;

  public isDisabled = false;

  /** @description model */
  public checkedValues: any[] = [];

  public onInputChange(event: Event): void {
    const { checked } = event.target as HTMLInputElement;

    if (checked) {
      this.checkedValues = [...this.checkedValues, this.value];
    } else {
      this.checkedValues = this.checkedValues.filter(
        (value) => value !== this.value
      );
    }

    this.onChange(this.checkedValues);
    this.onChecked.emit(this.value);
  }

  public isChecked(): boolean {
    return this.checkedValues?.includes(this.value);
  }

  public writeValue(value: any): void {
    this.checkedValues = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
