import { Injectable } from '@angular/core';
import { Observable, timer, map, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  public constructor() {}

  /**
   * Create a countdown observable that emits the remaining time.
   */
  public create({ timeLimit }: { timeLimit: number }): Observable<number> {
    const intervalTime = 1000;
    const countdown$ = timer(0, intervalTime).pipe(
      map((_count) => {
        // count + 1 since timer start emitting 0.
        const count = _count + 1;
        const remainingTime = timeLimit - count + 1;
        return remainingTime;
      }),
      takeWhile((remainingTime) => remainingTime >= 0)
    );
    return countdown$;
  }
}
