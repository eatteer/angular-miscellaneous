import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AutoCompleteQueryChangeEvent } from './types/autocomplete-query-change-event';
import { CdkListbox } from '@angular/cdk/listbox';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteComponent,
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {
  @ViewChild('trigger', { static: true, read: ElementRef<HTMLInputElement> })
  public inputRef!: ElementRef<HTMLInputElement>;

  @ViewChild(CdkListbox)
  public suggestionsListBox!: CdkListbox;

  @Input()
  public suggestions: any;

  @Input()
  public displayValueKey?: string;

  @Input()
  public suggestionTemplate?: TemplateRef<any>;

  @Output()
  public onQueryChange = new EventEmitter<AutoCompleteQueryChangeEvent>();

  public isOpen = false;

  public model: any;

  public onChange!: (value: any) => void;
  public onTouched!: () => void;

  public isDisabled = false;

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.suggestionsListBox.focus();
    }
  }

  public openSuggestions(): void {
    this.isOpen = true;
  }

  public closeSuggestions(): void {
    this.isOpen = false;
  }

  public queryChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;

    this.onQueryChange.emit({ originalEvent: event, query });
  }

  public selectSuggestion(suggestion: any): void {
    this.model = suggestion;
    this.onChange(this.model);
    this.inputRef.nativeElement.value = this.getDisplayValue(this.model);
    this.closeSuggestions();
  }

  public getDisplayValue(suggestion: any): string {
    return this.displayValueKey ? suggestion[this.displayValueKey] : suggestion;
  }

  public writeValue(value: any): void {
    this.model = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
