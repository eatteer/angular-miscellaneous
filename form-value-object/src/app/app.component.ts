import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

export interface Field {
  key: string;
  label: {
    translationKey: string;
  };
  options: {
    [key: string | number]: {
      value: string | number;
      metaValue: unknown;
      displayValue: {
        translationKey: string;
        translationParams: unknown;
      };
    };
  };
}

export interface Schema {
  [key: string | number]: Field;
}

export class FormSchema {
  public constructor(public schema: Schema) {}

  public getField(key: string): Field {
    return this.schema[key];
  }

  public getLabelTranslationKey(key: string): string {
    return this.schema[key].label.translationKey;
  }

  public getValueTranslationKey(key: string, value: any): string {
    return this.schema[key].options[value].displayValue.translationKey;
  }
}

export type LoremFormValues = {
  telephone: number;
};

export type LoremForm = FormGroup<{
  telephone: FormControl<number>;
}>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public loremFormSchema = new FormSchema({
    telephone: {
      key: 'telephone',
      label: {
        translationKey: 'telephone',
      },
      options: {
        0: {
          value: 0,
          metaValue: {},
          displayValue: {
            translationKey: 'lorem',
            translationParams: { lorem: 'lorem' },
          },
        },
        1: {
          value: 1,
          metaValue: {},
          displayValue: {
            translationKey: 'ipsum',
            translationParams: { ipsum: 'ipsum' },
          },
        },
      },
    },
  });

  public loremForm!: FormGroup<{
    telephone: FormControl<number>;
  }>;

  public appliedFilters: Partial<LoremFormValues> = {};

  public constructor(private readonly fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    this.loremForm = this.fb.group({
      telephone: [0],
    });
  }

  public applyFilters(): void {
    const values = this.loremForm.getRawValue() as LoremFormValues;
    this.appliedFilters = values;
  }
}
