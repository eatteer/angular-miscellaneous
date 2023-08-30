import { Injectable } from '@angular/core';

@Injectable()
export class IpsumService {
  public id = 0;

  public constructor() {
    this.id++;
  }
}
