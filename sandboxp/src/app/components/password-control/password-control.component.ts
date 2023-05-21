import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  PasswordValidation,
  passwordValidations,
  validatePassword,
} from './password.validator';

@Component({
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss'],
})
export class PasswordControlComponent {
  public validations: PasswordValidation[] = [];

  public control!: FormControl<string | null>;

  public constructor(private _formBuilder: FormBuilder) {}

  public createControl(
    validations: PasswordValidation[] = passwordValidations
  ): FormControl<string | null> {
    this.validations = validations;

    this.control = this._formBuilder.control('', [
      Validators.required,
      validatePassword(this.validations),
    ]);

    return this.control;
  }

  public generateValidationClassesFor(errorCode: string) {
    const classes = {
      'tw-text-green-600': !this.control.hasError(errorCode),
      'tw-text-red-600': this.control.hasError(errorCode),
    };
    return classes;
  }
}
