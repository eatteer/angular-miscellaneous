import { FormControl, FormGroup } from '@angular/forms';

export interface CampaingsFilters {
  campaign: string;
  temperature: string;
  country: string;
  revenue: string;
  status: string;
}

export type CampaignsFiltersForm = FormGroup<{
  campaign: FormControl<string>;
  temperature: FormControl<string>;
  country: FormControl<string>;
  revenue: FormControl<string>;
  status: FormControl<string>;
}>;
