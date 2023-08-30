import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MetaFormService } from './services/meta-form/meta-form.service';
import { MetaForm } from './services/meta-form/meta-form-schema.type';
import { MetaValue } from './services/meta-form/meta-value.type';

export interface LoremFormValues {
  address: {
    city: string;
    street: string;
  };
  device: string;
  name: string;
  description: string;
}

export interface LoremFormMetaValues {
  address: {
    city: MetaValue<string, string>;
    street: MetaValue<string, string>;
  };
  device: MetaValue<string, string>;
  name: MetaValue<string, string>;
  description: MetaValue<string, string>;
  price: MetaValue<number, { min: number; max: number }>;
}

export type LoremForm = FormGroup<{
  address: FormGroup<{
    city: FormControl<string>;
    street: FormControl<string>;
  }>;
  device: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
}>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public loremMetaForm: MetaForm = {
    address: {
      label: 'Address',
      type: 'group',
      group: {
        city: {
          label: 'City',
          type: 'select',
          options: [
            { label: 'City 1', value: '0', metaValue: 'City 1' },
            { label: 'City 2', value: '1', metaValue: 'City 2' },
            { label: 'City 3', value: '2', metaValue: 'City 3' },
          ],
        },
        street: {
          label: 'Street',
          type: 'select',
          options: [
            { label: 'Street 1', value: '0', metaValue: 'Street 1' },
            { label: 'Street 2', value: '1', metaValue: 'Street 2' },
            { label: 'Street 3', value: '2', metaValue: 'Street 3' },
          ],
        },
      },
    },
    device: {
      label: 'Devices',
      type: 'radio',
      options: [
        {
          label: 'Device 1',
          name: 'devices',
          value: '0',
          metaValue: 'Device 1',
        },
        {
          label: 'Device 2',
          name: 'devices',
          value: '1',
          metaValue: 'Device 2',
        },
        {
          label: 'Device 3',
          name: 'devices',
          value: '2',
          metaValue: 'Device 3',
        },
      ],
    },
    name: {
      label: 'Name',
      type: 'text',
      metaValue: 'name',
    },
    description: {
      label: 'Description',
      type: 'text',
      metaValue: 'description',
    },
    price: {
      label: 'Price',
      type: 'select',
      options: [
        { label: 'From 0 to 10', value: '0', metaValue: { min: 0, max: 10 } },
        { label: 'From 10 to 20', value: '1', metaValue: { min: 10, max: 20 } },
        { label: 'From 20 to 30', value: '2', metaValue: { min: 20, max: 30 } },
      ],
    },
  };

  public form!: LoremForm;

  public constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly metaFormService: MetaFormService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: this.formBuilder.group({ city: [''], street: [''] }),
      device: [''],
      name: [''],
      description: [''],
      price: [0],
    });

    this.form.valueChanges.subscribe((value) => {
      const metaValues = this.metaFormService.getMetaValues(
        value,
        this.loremMetaForm
      ) as LoremFormMetaValues;
      console.log(metaValues);
    });
  }

  public applyFilters(): void {
    const value = this.form.getRawValue() as LoremFormValues;
    const metaValues = this.metaFormService.getMetaValues(
      value,
      this.loremMetaForm
    ) as LoremFormValues;
    console.log(metaValues);
  }

  public get cityOptions() {
    return this.loremMetaForm['address'].group!['city'].options!;
  }

  public get streetOptions() {
    return this.loremMetaForm['address'].group!['street'].options!;
  }

  public get priceOptions() {
    return this.loremMetaForm['price'].options!;
  }

  public get devicesOptions() {
    return this.loremMetaForm['device'].options!;
  }
}
