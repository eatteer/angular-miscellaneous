import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CampaingsFilters, CampaignsFiltersForm } from './types';
import { ObjectService } from '../services/object.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-campaigns-filters-form',
  templateUrl: './campaigns-filters-form.component.html',
  styleUrls: ['./campaigns-filters-form.component.scss'],
})
export class CampaignsFiltersFormComponent implements OnInit {
  @Input()
  public initialFilters!: Partial<CampaingsFilters>;

  @Input()
  public shouldShowApplyFilters: boolean = true;

  @Input()
  public shouldShowClear: boolean = true;

  @Output()
  public onAppliedFilters = new EventEmitter<Partial<CampaingsFilters>>();

  public formGroup!: CampaignsFiltersForm;
  public defaultFilters: CampaingsFilters = {
    campaign: '',
    temperature: '',
    country: '',
    revenue: '',
    status: '',
  };

  public appliedFilters: Partial<CampaingsFilters> = {};

  public constructor(
    private activeModal: NgbActiveModal,
    private objectService: ObjectService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.buildForm(this.initialFilters);
    this.appliedFilters = this.objectService.clean(this.initialFilters, [
      null,
      '',
    ]);
  }

  public applyFilters(): void {
    const filters = this.formGroup.getRawValue() as CampaingsFilters;
    this.appliedFilters = this.objectService.clean(filters, [null, '']);
    this.onAppliedFilters.next(this.appliedFilters);
  }

  public clearFilters(): void {
    this.formGroup.reset(this.defaultFilters);
    this.applyFilters();
  }

  public removeFilter(key: keyof CampaingsFilters): void {
    const control = this.formGroup.get(key);
    if (!control) throw new Error(`Form control with key ${key} was not found`);
    control.setValue(this.defaultFilters[key]);
    this.applyFilters();
  }

  public closeModal(): void {
    this.activeModal.close();
  }

  public buildForm(
    initialFilters?: Partial<CampaingsFilters>
  ): CampaignsFiltersForm {
    const filters: CampaingsFilters = {
      ...this.defaultFilters,
      ...initialFilters,
    };

    const formGroup = this.formBuilder.group({
      campaign: [filters.campaign],
      temperature: [filters.temperature],
      country: [filters.country],
      revenue: [filters.revenue],
      status: [filters.status],
    });

    return formGroup;
  }
}
