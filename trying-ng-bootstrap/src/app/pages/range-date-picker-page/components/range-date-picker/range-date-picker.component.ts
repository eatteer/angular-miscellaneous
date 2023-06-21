import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
})
export class RangeDatePickerComponent {
  public value: string = '';
  public range = {
    start: '',
    end: '',
  };

  public startDateChange(event: MatDatepickerInputEvent<Date>) {
    const { value } = event;
    const date = value?.toLocaleDateString() ?? '';
    this.range.start = date;
    this.mergeDates();
  }

  public endDateChange(event: MatDatepickerInputEvent<Date>) {
    const { value } = event;
    const date = value?.toLocaleDateString() ?? '';
    this.range.end = date;
    this.mergeDates();
  }

  public mergeDates(): void {
    const { start, end } = this.range;
    this.value = `${start} - ${end}`;
  }
}
