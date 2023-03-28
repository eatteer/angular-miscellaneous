import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CounterComponent,
      multi: true,
    },
  ],
})
export class CounterComponent implements ControlValueAccessor {
  @Input()
  public value = 0;

  public onChange = (value: number) => {};
  public onTouched = () => {};

  public add(): void {
    this.changeAndTouch(++this.value);
  }
  public subtract(): void {
    this.changeAndTouch(--this.value);
  }

  // Angular sets the value on the component.
  public writeValue(value: number): void {
    this.value = value;
  }

  // Let Angular knows that the value changed through the callback it exposes.
  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  // Let Angular knows that the input was touched through the callback it exposes.
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private changeAndTouch(value: number): void {
    this.onTouched();
    this.onChange(value);
  }
}
