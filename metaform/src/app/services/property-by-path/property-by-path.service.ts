import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PropertyByPathService {
  public get(obj: Record<string, any>, path: string): any | undefined {
    const pathArray = path.split('.');
    let value = obj;

    for (const key of pathArray) {
      if (value === undefined || value === null) {
        return undefined;
      }

      value = value[key];
    }

    return value;
  }
}
