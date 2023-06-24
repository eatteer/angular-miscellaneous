import { Component, Input, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input()
  public options: any[] = [];

  @Input()
  public selectedTemplate?: TemplateRef<any>;

  @Input()
  public itemTemplate?: TemplateRef<any>;

  @Input()
  public itemName: string = 'name';

  @Input()
  public itemValue: string = 'value';

  @Input()
  public shouldShowArrow: boolean = true;

  public selectedOption?: any;

  public isOpen: boolean = false;

  public onChange: (value: any) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (!this.itemValue) {
      throw new Error('No itemValue provided');
    }

    if (!this.options || this.options.length === 0) {
      throw new Error('No options provided');
    }

    this.selectValue(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public selectValue(value: any): void {
    this.selectedOption = this.options.find(
      (option) => option[this.itemValue] === value
    );

    this.onChange(value);
    this.onTouched();

    this.isOpen = false;
  }

  public toggleOptions(): void {
    this.isOpen = !this.isOpen;
  }
}
