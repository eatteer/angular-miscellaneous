import { FormValueObject } from './form-value-object';
import { TranslateableFormValueObject } from './translatable-form-value-object';

export class Telephone {
  public constructor(public value: string) {}

  public get translationKey(): string {
    return 'telephone';
  }

  public toString(): string {
    console.log(this.value);
    return this.value;
  }
}
