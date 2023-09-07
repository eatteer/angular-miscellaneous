import { Component, Injector, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input()
  public validateOnBlur: boolean = true;

  @Input()
  public validateOnEmpty: boolean = true;

  @Input()
  public validateOnInput: boolean = false;

  public control!: AbstractControl;

  public isFocused: boolean = false;
  public isInvalid: boolean = false;
  public isValid: boolean = false;

  public value: string = '';

  public onChange!: (value: string) => void;
  public onTouch!: () => void;

  public constructor(public injector: Injector) {}

  public ngOnInit(): void {
    this.control = this.injector.get(NgControl).control!;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public onFocus() {
    this.isFocused = true;
  }

  public onBlur() {
    this.isFocused = false;
    if (this.validateOnBlur) this.checkValidity();
  }

  public onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);

    // Validate when value is empty regardless of the validation trigger event.
    if (this.validateOnEmpty && this.value.trim() === '') {
      this.configNeutralState();
    }

    if (this.validateOnInput) this.checkValidity();
  }

  private checkValidity() {
    if (this.value !== '') {
      // If validate on blur then check validity if the input is not focused
      // else true to short circuit the expression.
      const onBlurValidation = this.validateOnBlur ? !this.isFocused : true;

      if (this.control.invalid && onBlurValidation) this.configInvalidState();
      else this.configValidState();
    } else this.configNeutralState();
  }

  public manuallyCheckValidity() {
    if (this.control.invalid) this.configInvalidState();
    else this.configValidState();
  }

  public configInvalidState(): void {
    this.isInvalid = true;
    this.isValid = false;
  }

  public configValidState(): void {
    this.isValid = true;
    this.isInvalid = false;
  }

  public configNeutralState(): void {
    this.isInvalid = false;
    this.isValid = false;
  }
}
