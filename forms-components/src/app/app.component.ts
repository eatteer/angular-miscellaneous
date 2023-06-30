import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PeriodDateRangeComponent,
  PeriodDateRangeGroupSchema,
} from './components/period-date-range/period-date-range.component';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';

export type LoremGroupSchema = FormGroup<{
  dateRange: PeriodDateRangeGroupSchema;
}>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(PeriodDateRangeComponent, { static: true })
  public periodDateRangeComponent!: PeriodDateRangeComponent;

  public form!: LoremGroupSchema;

  public constructor(private fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      dateRange: this.periodDateRangeComponent.createForm({
        period: 'today',
      }),
    });
  }
}
