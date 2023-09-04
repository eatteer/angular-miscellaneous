import {
  Component,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { computePosition, flip } from '@floating-ui/dom';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input()
  public options: any[] = [];

  @Input()
  public placeholder: string = 'Select an option';

  @Input()
  public optionLabel: string = 'label';

  @Input()
  public optionTemplate?: TemplateRef<any>;

  @ViewChild('selectOptionsToggler')
  public optionsTogglerRef!: ElementRef<HTMLButtonElement>;

  @ViewChild('selectOptions')
  public optionsRef!: ElementRef<HTMLDivElement>;

  public selectedOption: any = null;

  public isShowOptions: boolean = false;

  public onChange: any = () => {};
  public onTouched: any = () => {};
  public isDisabled: boolean = false;

  public ngAfterViewInit(): void {
    this.computeOptionsPosition();
  }

  public getDynamicClasses(): Record<string, boolean> {
    return {
      'tw-visible': this.isShowOptions,
      'tw-invisible': !this.isShowOptions,
    };
  }

  public toggleOptions(): void {
    this.isShowOptions = !this.isShowOptions;
  }

  public showOptions(): void {
    this.isShowOptions = true;
  }

  public hideOptions(): void {
    this.isShowOptions = false;
  }

  public onSelectedOption(value: any): void {
    this.selectedOption = value;
    this.onChange(value);
    this.onTouched();
    this.hideOptions();
  }

  public generateOptionId(option: any): string {
    return `select-option-${option[this.optionLabel]}}`;
  }

  public computeOptionsPosition(): void {
    computePosition(
      this.optionsTogglerRef.nativeElement,
      this.optionsRef.nativeElement,
      {
        middleware: [flip()],
      }
    ).then(({ x, y }) => {
      Object.assign(this.optionsRef.nativeElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  public writeValue(obj: any): void {
    this.selectedOption = obj;
    this.onChange(obj);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
