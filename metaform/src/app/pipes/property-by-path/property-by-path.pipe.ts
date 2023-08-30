import { Pipe, PipeTransform } from '@angular/core';
import { PropertyByPathService } from 'src/app/services/property-by-path/property-by-path.service';

@Pipe({
  name: 'propertyByPath',
})
export class PropertyByPathPipe implements PipeTransform {
  public constructor(
    private readonly propertyByPathService: PropertyByPathService
  ) {}

  public transform(
    obj: any,
    path: string,
    ...args: any[]
  ): ReturnType<PropertyByPathService['get']> {
    return this.propertyByPathService.get(obj, path);
  }
}
