import { Component, Input, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from './types/multiselect';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiselectComponent,
      multi: true,
    },
  ],
})
export class MultiselectComponent implements ControlValueAccessor {
  @Input()
  public options: Option[] = [];

  @Input()
  public groupTemplate?: TemplateRef<{ $implicit: Option }>;

  public isOpen: boolean = false;

  public value: Option[] = [];

  public onChange = (value: Option[]) => {};
  public onTouched = (value: Option[]) => {};
  public isDisabled: boolean = false;

  public toggleOptions(): void {
    this.isOpen = !this.isOpen;
  }

  public openOptions(): void {
    this.isOpen = true;
  }

  public closeOptions(): void {
    this.isOpen = false;
  }

  public selectOption(option: Option): void {
    if (this.value.find((item) => item.value === option.value)) return;
    this.value.push(option);
    this.onChange(this.value);
  }

  public removeOption(option: Option): void {
    this.value = this.value.filter((item) => item.value !== option.value);
    this.onChange(this.value);
  }

  // Angular sends the value so to the component can update the value
  public writeValue(value: any): void {
    this.value = value;
  }

  // Component sends the value so Angular can update the value
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
