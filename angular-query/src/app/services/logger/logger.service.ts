import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public log(message: any): void {
    console.log(message);
  }
}
