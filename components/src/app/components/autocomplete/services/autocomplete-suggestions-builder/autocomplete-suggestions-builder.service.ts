import { Injectable } from '@angular/core';
import { AutoCompleteQueryChangeEvent } from '../../types/autocomplete-query-change-event';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteSuggestionsBuilderService {
  public build(
    suggestions: any[],
    displayValueKey?: string
  ): (event: AutoCompleteQueryChangeEvent) => any[] {
    const sempiternalSuggestions = JSON.parse(JSON.stringify(suggestions));
    return (event: AutoCompleteQueryChangeEvent) => {
      return event.query.trim().length > 0
        ? suggestions.filter((suggestion) => {
            const value = displayValueKey
              ? suggestion[displayValueKey]
              : suggestion;
            return value.toLowerCase().includes(event.query.toLowerCase());
          })
        : sempiternalSuggestions;
    };
  }
}
