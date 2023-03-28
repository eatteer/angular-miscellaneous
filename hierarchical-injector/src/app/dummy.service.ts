import { Injectable } from '@angular/core';

@Injectable()
export class DummyService {
  public constructor() {}

  public alert(message: any): void {
    alert(message);
  }
}
