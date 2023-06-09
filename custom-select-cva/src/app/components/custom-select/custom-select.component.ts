import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomSelectsService } from 'src/app/services/custom-selects.service';

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
export class CustomSelectComponent implements ControlValueAccessor, OnDestroy {
  public options: Option[] = [
    { displayValue: 'Pereira', value: 1 },
    { displayValue: 'Medellín', value: 2 },
    { displayValue: 'Bogotá', value: 3 },
  ];

  public show = false;

  public selectedOption: Option | null = null;

  public constructor(private customSelectService: CustomSelectsService) {
    this.customSelectService.register(this);
  }

  /**
   * If click inside component view childs
   * do not propagate the event. So, the
   * document:click event is not reached.
   */
  @HostListener('click', ['$event'])
  public onClickInside(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  public onClickOutside(): void {
    this.show = false;
  }

  public toggleShow(): void {
    this.show = !this.show;
    this.customSelectService.closeAllExcept(this);
  }

  public selectOption(option: Option): void {
    this.selectedOption = option;
    this.onChange(this.selectedOption);
    this.show = false;
  }

  public onChange = (option: Option) => {};

  public onTouched = () => {};

  public writeValue(option: Option): void {
    this.selectedOption = option;
  }

  public registerOnChange(fn: (option: Option) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}

  public ngOnDestroy(): void {
    this.customSelectService.remove(this);
  }
}
