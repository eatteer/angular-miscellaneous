import { Pipe, PipeTransform } from '@angular/core';
import { ObjectService } from '../services/object.service';

@Pipe({
  name: 'hasKeys',
})
export class HasKeysPipe implements PipeTransform {
  public constructor(private objectService: ObjectService) {}

  public transform<T extends {}>(object: T, ...args: any[]): boolean {
    return this.objectService.hasKeys(object);
  }
}
