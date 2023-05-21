import { AbstractControl, ValidationErrors } from '@angular/forms';

export type PasswordValidation = {
  name: string;
  isActive: boolean;
  validator: (password: string) => boolean;
  message: string;
};

export const passwordValidations: PasswordValidation[] = [
  {
    name: 'uppercase',
    isActive: true,
    validator: (password: string) => !/[A-Z]/.test(password),
    message: 'Contain at least one uppercase letter',
  },
  {
    name: 'lowercase',
    isActive: true,
    validator: (password: string) => !/[a-z]/.test(password),
    message: 'Contain at least one lowercase letter',
  },
  {
    name: 'digit',
    isActive: true,
    validator: (password: string) => !/[0-9]/.test(password),
    message: ' Contain at least one digit',
  },
  {
    name: 'specialChar',
    isActive: true,
    validator: (password: string) => !/[$@$!%*?&]/.test(password),
    message: 'Contain at least one special character',
  },
  {
    name: 'minLength',
    isActive: true,
    validator: (password?: string) => password!.length < 8,
    message: 'Be at least 8 characters long',
  },
];

export const validatePassword =
  (validations: PasswordValidation[] = passwordValidations) =>
  (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const errors: ValidationErrors = {};

    validations.forEach((validation) => {
      if (validation.isActive && validation.validator(password)) {
        errors[validation.name] = true;
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  };
