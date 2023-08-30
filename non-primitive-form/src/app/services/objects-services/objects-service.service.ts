import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  public constructor() {}

  /**
   * Returns a new object with cleanable properties removed
   */
  public clean<T extends Record<string, any>>(
    object: T,
    cleanableValues: any[]
  ): Partial<T> {
    const cleanObject = {} as any;

    for (const [key, value] of Object.entries(object)) {
      // If value is an object and it's not null then enter recursively.
      if (typeof value === 'object' && value !== null) {
        const nestedCleanObject = this.clean(value, cleanableValues);
        // Does the processed nested object have properties?
        // If so, then add it to the new generated clean object
        // ¿Why would I want an empty object?
        if (Object.keys(nestedCleanObject).length !== 0) {
          cleanObject[key as keyof T] = nestedCleanObject;
        }
        // If value is not inside cleanableValues
        // then add it to the new generated clean object.

        // For example, if value is not an object, a null,
        // an empty string and a false.
      } else if (!cleanableValues.includes(value)) {
        cleanObject[key as keyof T] = value;
      }
    }

    return cleanObject as Partial<T>;
  }

  public getKeys<T extends {}>(object: T): Array<keyof T> {
    return Object.keys(object) as Array<keyof T>;
  }

  public hasKeys<T extends {}>(object: T): boolean {
    return Boolean(Object.keys(object).length);
  }
}
