import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FiltersFormComponent } from 'src/app/filters-form/filters-form.component';
import { Filters, FiltersGroup } from 'src/app/filters-form/types';

@Component({
  selector: 'app-campaings-page',
  templateUrl: './campaings-page.component.html',
  styleUrls: ['./campaings-page.component.scss'],
})
export class CampaingsPageComponent {
  public filtersModal!: NgbModalRef;
  public filtersFormComponent!: FiltersFormComponent;
  public filtersForm!: FormGroup<FiltersGroup>;

  public appliedFilters: Partial<Filters> = {};

  public constructor(private _modalService: NgbModal) {}

  public openFiltersForm(): void {
    this.filtersModal = this._modalService.open(FiltersFormComponent, {
      centered: true,
    });

    this.filtersFormComponent = this.filtersModal.componentInstance;

    this.filtersForm = this.filtersFormComponent.createForm(
      this.appliedFilters
    );

    this.filtersFormComponent.onAppliedFilters.subscribe((filters) => {
      this.onAppliedFilters(filters);
    });

    this.filtersFormComponent.onReset.subscribe((_) => {
      this.onReset();
    });
  }

  public onAppliedFilters(filters: Partial<Filters>) {
    this.appliedFilters = filters;
  }

  public removeFilter(key: keyof Filters): void {
    this.filtersFormComponent.removeFilter(key);
  }

  public onReset(): void {}
}
