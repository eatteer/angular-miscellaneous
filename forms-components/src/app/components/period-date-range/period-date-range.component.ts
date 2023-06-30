import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { DatePeriod } from '../period/period.component';

export type PeriodDateRangeGroupSchema = FormGroup<{
  period: FormControl<DatePeriod>;
  from: FormControl<string>;
  to: FormControl<string>;
}>;

@Component({
  selector: 'app-period-date-range',
  templateUrl: './period-date-range.component.html',
  styleUrls: ['./period-date-range.component.css'],
})
export class PeriodDateRangeComponent implements OnInit {
  public form?: PeriodDateRangeGroupSchema;

  public constructor(private fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    if (!this.form) {
      throw new Error('PeriodDateRange form has not been initiated');
    }

    this.form.controls.period.valueChanges.subscribe((_) => {});
  }

  public createForm(formState: {
    period?: DatePeriod;
    from?: string;
    to?: string;
  }): PeriodDateRangeGroupSchema {
    this.form = this.fb.group({
      period: this.fb.control(formState.period ?? 'month'),
      from: this.fb.control(formState.from ?? ''),
      to: this.fb.control(formState.to ?? ''),
    });

    return this.form;
  }
}
