import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input()
  public options: any[] = [];

  @Input()
  public displayValue: string = 'displayValue.value';

  @Input()
  public displayValueTranslateKey: string = 'displayValue.translateKey';

  public onChange!: (value: any) => void;
  public onTouched!: () => void;

  /** @description model */
  public selectedValue: any;

  public isDisabled = false;

  public onSelectChange(_: Event): void {
    this.onChange(this.selectedValue);
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
