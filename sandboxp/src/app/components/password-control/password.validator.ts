import { AbstractControl, ValidationErrors } from '@angular/forms';

export type PasswordErrors = {
  uppercase?: boolean;
  lowercase?: boolean;
  digit?: boolean;
  specialChar?: boolean;
  minLength?: boolean;
};

export const validatePassword =
  () =>
  (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const errors: PasswordErrors = {};

    if (!/[A-Z]/.test(password)) {
      errors.uppercase = true;
    }

    if (!/[a-z]/.test(password)) {
      errors.lowercase = true;
    }

    if (!/[0-9]/.test(password)) {
      errors.digit = true;
    }

    if (!/[$@$!%*?&]/.test(password)) {
      errors.specialChar = true;
    }

    if (password.length < 8) {
      errors.minLength = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
