import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  DEFAULT_CHECKED_GROUP_OPTIONS,
  DEFAULT_INCOME_RANGE_OPTION,
  DEFAULT_SELECTED_STATUS_OPTION,
  GROUP_OPTIONS,
  INCOME_RANGES_OPTIONS,
  STATUS_OPTIONS,
} from './constants/filters-form';

export type Option<Value, TranslateParams = {}, MetaData = {}> = {
  value: Value | null;
  label?: {
    translateKey: string;
  };
  displayValue?: {
    value?: any;
    translateKey?: string;
    translateParams?: TranslateParams;
  };
  metaData?: MetaData;
};

export type IncomeRange = {
  min: number;
  max: number;
};

export type SearchControl = FormControl<string>;
export type IncomeRangeOption = Option<IncomeRange>;
export type StatusOption = Option<number>;
export type GroupOption = Option<string, {}, GroupMetaData>;
export type GroupMetaData = {
  allowedCombinations: string[];
};

export type FiltersForm = FormGroup<{
  search: SearchControl;
}>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public INCOME_RANGES_OPTIONS = INCOME_RANGES_OPTIONS;
  public STATUS_OPTIONS = STATUS_OPTIONS;
  public GROUP_OPTIONS = GROUP_OPTIONS;

  /** Form */
  public filtersForm!: FiltersForm;

  /** Selected values */
  public selectedIncomeRangeOption = DEFAULT_INCOME_RANGE_OPTION;
  public selectedStatusOption = DEFAULT_SELECTED_STATUS_OPTION;
  public checkedGroupOptions = DEFAULT_CHECKED_GROUP_OPTIONS;

  public constructor(private readonly fb: FormBuilder) {}

  public ngOnInit(): void {
    this.filtersForm = this.fb.group({
      search: this.fb.control<string>('', { nonNullable: true }),
    });
  }

  public ensureAtLeastGroupByCampaignIsChecked(): void {
    if (this.checkedGroupOptions.length === 0) {
      this.checkedGroupOptions = [this.GROUP_OPTIONS[2]];
    }
  }

  public onGroupOptionChecked(checkedGroupOption: GroupOption): void {
    const isInAllowedCombinations = (groupOption: GroupOption) => {
      return checkedGroupOption.metaData?.allowedCombinations.find(
        (switchId) => switchId === groupOption.value
      );
    };

    const isCheckedGroupOption = (groupOption: GroupOption) => {
      return groupOption.value === checkedGroupOption.value;
    };

    this.checkedGroupOptions.forEach((groupOption) => {
      if (
        !isCheckedGroupOption(groupOption) &&
        !isInAllowedCombinations(groupOption)
      ) {
        this.checkedGroupOptions = this.checkedGroupOptions.filter(
          (checkedGroupOption) => {
            return checkedGroupOption.value !== groupOption.value;
          }
        );
      }
    });

    this.ensureAtLeastGroupByCampaignIsChecked();
  }

  public resetForm(): void {
    this.filtersForm.reset();
    this.selectedIncomeRangeOption = DEFAULT_INCOME_RANGE_OPTION;
    this.selectedStatusOption = DEFAULT_SELECTED_STATUS_OPTION;
    this.checkedGroupOptions = DEFAULT_CHECKED_GROUP_OPTIONS;
  }
}
