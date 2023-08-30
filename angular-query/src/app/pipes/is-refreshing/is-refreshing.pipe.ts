import { Pipe, PipeTransform } from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';

@Pipe({
  name: 'isRefreshing',
})
export class IsRefreshingPipe implements PipeTransform {
  transform(queryObserverResult: QueryObserverResult): boolean {
    return !queryObserverResult.isLoading && queryObserverResult.isFetching;
  }
}
