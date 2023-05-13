import { Pipe, PipeTransform } from '@angular/core';
import { ObjectService } from '../services/object.service';

@Pipe({
  name: 'hasKeys',
})
export class HasKeysPipe implements PipeTransform {
  public constructor(private _objectService: ObjectService) {}

  public transform<T extends {}>(object: T, ...args: any[]): boolean {
    return this._objectService.hasKeys(object);
  }
}
