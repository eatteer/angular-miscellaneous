import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array',
})
export class ArrayPipe implements PipeTransform {
  public transform(obj: any, ...args: any[]): any[] {
    const array = Object.values(obj);
    return array;
  }
}
