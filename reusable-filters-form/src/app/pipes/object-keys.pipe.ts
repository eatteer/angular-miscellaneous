import { Pipe, PipeTransform } from '@angular/core';
import { ObjectService } from '../services/object.service';

@Pipe({
  name: 'objectKeys',
})
export class ObjectKeysPipe implements PipeTransform {
  public constructor(private _objectService: ObjectService) {}

  public transform<T extends {}>(object: T, ...args: any[]): Array<keyof T> {
    return this._objectService.getKeys(object);
  }
}
