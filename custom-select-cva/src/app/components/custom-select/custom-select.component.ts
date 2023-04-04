import { Component, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Option {
  displayValue: string;
  value: number;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomSelectComponent,
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  public options: Option[] = [
    { displayValue: 'Pereira', value: 1 },
    { displayValue: 'Medellín', value: 2 },
    { displayValue: 'Bogotá', value: 3 },
  ];

  public showOptions = false;

  public selectedOption: Option | null = null;

  /**
   * If click inside component view childs
   * do not propagate the event. So, the
   * document:click event is not reached.
   */
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  public onClickOutside(): void {
    this.showOptions = false;
  }

  public toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  public selectOption(option: Option): void {
    this.selectedOption = option;
    this.onChange(this.selectedOption);
    this.showOptions = false;
  }

  public onChange = (option: Option) => {};

  public writeValue(option: Option): void {
    this.selectedOption = option;
  }

  public registerOnChange(fn: (option: Option) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  public setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
}
