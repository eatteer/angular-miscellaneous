import { Component } from '@angular/core';
import { AutoCompleteQueryChangeEvent } from './components/autocomplete/types/autocomplete-query-change-event';
import { AutocompleteSuggestionsBuilderService } from './components/autocomplete/services/autocomplete-suggestions-builder/autocomplete-suggestions-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public suggestions = [
    { displayValue: 'Colombia', value: 'colombia' },
    { displayValue: 'Argentina', value: 'argentina' },
    { displayValue: 'Brazil', value: 'brazil' },
    { displayValue: 'Chile', value: 'chile' },
  ];

  public autocompleteSuggestions = this.autocompleteSuggestionsBuilder.build(
    this.suggestions,
    'displayValue'
  );

  public selectedSuggestion: {
    displayValue: string;
    value: string;
  } | null = null;

  public constructor(
    private readonly autocompleteSuggestionsBuilder: AutocompleteSuggestionsBuilderService
  ) {}

  public onQueryChange(event: AutoCompleteQueryChangeEvent): void {
    this.suggestions = this.autocompleteSuggestions(event);
  }
}
