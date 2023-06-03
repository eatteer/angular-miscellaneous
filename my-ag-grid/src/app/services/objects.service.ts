import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectsService {
  public clone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
