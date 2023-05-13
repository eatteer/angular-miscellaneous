import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filters, FiltersGroup } from './types';
import { ObjectService } from '../services/object.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.scss'],
})
export class FiltersFormComponent {
  @Input()
  public shouldShowApplyFilters: boolean = true;

  @Input()
  public shouldShowClear: boolean = true;

  @Output()
  public onAppliedFilters: EventEmitter<Partial<Filters>> = new EventEmitter();

  @Output()
  public onReset: EventEmitter<void> = new EventEmitter();

  public defaultValues: Filters = {
    campaign: '',
    temperature: '',
    country: '',
    revenue: '',
    status: '',
  };

  public appliedFilters: Partial<Filters> = {};

  public form!: FormGroup<FiltersGroup>;

  public constructor(
    private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _objectService: ObjectService
  ) {}

  public createForm(initialValues?: Partial<Filters>): FormGroup<FiltersGroup> {
    const values = {
      ...this.defaultValues,
      ...initialValues,
    };

    this.form = this._formBuilder.group({
      campaign: [values.campaign],
      temperature: [values.temperature],
      country: [values.country],
      revenue: [values.revenue],
      status: [values.status],
    });

    this.applyFilters();

    return this.form;
  }

  /**
   * Read form raw values, clean the cleanable properties,
   * set {@link appliedFilters} and emit {@link onAppliedFilters}
   */
  public applyFilters(): void {
    const value = this.form.getRawValue() as Filters;
    const cleanableValues = [null, ''];
    this.appliedFilters = this._objectService.clean(value, cleanableValues);
    this.onAppliedFilters.next(this.appliedFilters);
  }

  public resetForm(): void {
    this.form.reset(this.defaultValues);
    this.onReset.next();
  }

  public removeFilter(key: keyof Filters): void {
    this.form.get(key)?.patchValue(this.defaultValues[key]);
    this.applyFilters();
  }

  public close(): void {
    this._activeModal.close();
  }
}
