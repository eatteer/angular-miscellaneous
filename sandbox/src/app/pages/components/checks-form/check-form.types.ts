import { FormControl } from '@angular/forms';

export type GroupsControls = {
  groupByDate: FormControl<boolean | null>;
  groupByMonth: FormControl<boolean | null>;
  groupByCampaign: FormControl<boolean | null>;
};

export type Groups<T> = {
  [K in keyof T]?: Array<keyof GroupsControls>;
};
