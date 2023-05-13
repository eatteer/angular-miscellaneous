import { FormControl } from '@angular/forms';

export interface Filters {
  campaign: string;
  temperature: string;
  country: string;
  revenue: string;
  status: string;
}

export type FiltersGroup = {
  campaign: FormControl<string | null>;
  temperature: FormControl<string | null>;
  country: FormControl<string | null>;
  revenue: FormControl<string | null>;
  status: FormControl<string | null>;
};
