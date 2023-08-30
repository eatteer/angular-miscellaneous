import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Directive({
  selector: '[formValueObject]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormValueObjectDirective,
      multi: true,
    },
  ],
})
export class FormValueObjectDirective implements ControlValueAccessor {
  public constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  public onInput(value: any): void {
    this.source.value = value;
    this.onChange(cloneDeep(this.source));
  }

  public isFirstTime = true;

  public source: any;
  public value: any;

  public onChange: any;

  public writeValue(obj: any): void {
    this.source = obj;
    this.value = obj.toString();
    this.elementRef.nativeElement.value = this.value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public setDisabledState?(isDisabled: boolean): void {}
}
