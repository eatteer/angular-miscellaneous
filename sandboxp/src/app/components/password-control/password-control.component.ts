import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordErrors, validatePassword } from './password.validator';

@Component({
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss'],
})
export class PasswordControlComponent {
  @Input()
  public isRequired: boolean = true;

  public control!: FormControl<string | null>;

  public constructor(private _formBuilder: FormBuilder) {}

  public createControl(): FormControl<string | null> {
    this.control = this._formBuilder.control('', [
      Validators.required,
      validatePassword(),
    ]);

    return this.control;
  }

  public hasError(errorCode: string): boolean {
    return this.control.hasError(errorCode);
  }

  public generateValidationClassesFor(errorCode: string) {
    const classes = {
      'tw-text-green-600': !this.hasError(errorCode),
      'tw-text-red-600': this.hasError(errorCode),
    };
    return classes;
  }
}
