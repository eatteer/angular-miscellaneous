import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CampaignsFiltersFormComponent } from 'src/app/campaigns-filters-form/campaigns-filters-form.component';
import { CampaingsFilters } from 'src/app/campaigns-filters-form/types';

@Component({
  selector: 'app-campaings',
  templateUrl: './campaings.component.html',
  styleUrls: ['./campaings.component.scss'],
})
export class CampaingsComponent {
  public campaignsFiltersModal!: NgbModalRef;
  public campaignsFiltersFormComponent!: CampaignsFiltersFormComponent;
  public appliedCampaignsFilters: Partial<CampaingsFilters> = {};

  public constructor(private modalService: NgbModal) {}

  public openCampaignsFiltersForm(): void {
    this.campaignsFiltersModal = this.modalService.open(
      CampaignsFiltersFormComponent,
      { centered: true }
    );

    this.campaignsFiltersFormComponent =
      this.campaignsFiltersModal.componentInstance;

    // @Input() initialFilters
    this.campaignsFiltersFormComponent.initialFilters =
      this.appliedCampaignsFilters;

    // @Input() onAppliedFilters
    this.campaignsFiltersFormComponent.onAppliedFilters.subscribe((filters) => {
      this.appliedCampaignsFilters = filters;
      this.campaignsFiltersModal.close();
    });
  }

  public removeCampaignsFilter(key: keyof CampaingsFilters): void {
    this.campaignsFiltersFormComponent.removeFilter(key);
  }
}
