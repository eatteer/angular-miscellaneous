import { Injectable } from '@angular/core';
import { ObjectService } from '../objects-services/objects-service.service';
import { MetaForm } from './meta-form-schema.type';

@Injectable({
  providedIn: 'root',
})
export class MetaFormService {
  public constructor(private readonly objectsService: ObjectService) {}

  public getMetaValues<FormValues extends { [key: string]: any }>(
    formValues: FormValues,
    metaForm: MetaForm
  ) {
    const metaValues: { [key: string]: any } = {};

    Object.keys(formValues).forEach((key) => {
      if (formValues[key]) {
        const schema = metaForm[key];

        if (schema.type === 'group') {
          if (schema.group) {
            metaValues[key] = this.getMetaValues(formValues[key], schema.group);
          } else {
            throw new Error(
              `MetaFormService: Group schema ${key} does not have a group property`
            );
          }
        }

        if (schema.type === 'text') {
          metaValues[key] = {
            label: schema.label,
            value: formValues[key],
            metaValue: schema.metaValue,
          };
        }

        if (schema.type === 'select' || schema.type === 'radio') {
          if (schema.options) {
            metaValues[key] = {
              label: schema.label,
              value: formValues[key],
              metaValue: schema.options.find(
                (option: any) => option.value == formValues[key]
              )?.metaValue,
            };
          } else {
            throw new Error(
              `MetaFormService: Select schema ${key} does not have an options property`
            );
          }
        }
      }
    });

    return this.objectsService.clean(metaValues, [undefined, null, '']);
  }
}
