import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Returns a new object with null and empty string properties removed
 */
const cleanObject = <T extends Record<string, any>>(obj: T): T => {
  const newObj = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    // If value is an object and it's not null then enter recursively.
    if (typeof value === 'object' && value !== null) {
      const newNestedObj = cleanObject(value);
      // Does the processed nested object have properties?
      // If so, then add it to the new generated object ¿Why would I want an empty object?
      if (Object.keys(newNestedObj).length !== 0) {
        newObj[key as keyof T] = newNestedObj;
      }
      // If value is not an object and null and an empty string
      // then add it to the new generated object.
    } else if (value !== null && value !== '') {
      newObj[key as keyof T] = value;
    }
  }

  return newObj;
};

enum TypeAccount {
  SavingsAccount = 'savingsAccount',
  CheckingAccount = 'checkingAccount',
}

const formInitialValues = {
  typeAccount: '',
  accountNumber: '',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public TypeAccount = TypeAccount;

  public form = this._fb.group({
    typeAccount: [formInitialValues.typeAccount, [Validators.required]],
    accountNumber: [formInitialValues.accountNumber],
  });

  public constructor(private _fb: FormBuilder) {
    this.form.controls.typeAccount.valueChanges.subscribe((value) => {
      if (value === TypeAccount.CheckingAccount)
        this._turnOnAccountNumberControl();
      if (value !== TypeAccount.CheckingAccount)
        this._turnOffAccountNumberControl();
    });
  }

  public submit(): void {
    console.log(cleanObject(this.form.value));
  }

  public get typeAccountControl() {
    return this.form.controls.typeAccount;
  }

  public get accountNumberControl() {
    return this.form.controls.accountNumber;
  }

  private _turnOnAccountNumberControl(): void {
    this.accountNumberControl.addValidators([Validators.required]);
    this.accountNumberControl.updateValueAndValidity();
  }

  private _turnOffAccountNumberControl(): void {
    this.accountNumberControl.reset(formInitialValues.accountNumber);
    this.accountNumberControl.clearValidators();
    this.accountNumberControl.updateValueAndValidity();
  }
}
