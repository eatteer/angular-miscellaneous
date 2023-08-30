import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { WEEK_DAYS } from './constants/week-days';
import { Day } from './types/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  protected WEEK_DAYS = WEEK_DAYS;
  protected numberOfFirstDaysToSelect = 5;

  protected currentDate = moment.utc();
  protected daysInMonth: Day[] = [];

  public ngOnInit() {
    const month = this.currentDate.month() + 1;
    const year = this.currentDate.year();
    const { daysInMonth, currentDate } = this.getDaysInMonth(month, year);

    this.daysInMonth = daysInMonth;
    this.currentDate = currentDate;
  }

  protected navigateToPreviousMonth() {
    this.navigateByMonths(-1);
  }

  protected navigateToNextMonth() {
    this.navigateByMonths(1);
  }

  protected getDaysInMonth(month: number, year: number) {
    // Get the beginnig of the month and the end of the month
    const beginningOfMonth = moment.utc(`${year}-${month}-01`);
    const endOfMonth = beginningOfMonth.clone().endOf('month');

    // Get the number of days in the month
    const totalDaysInMonth = endOfMonth.date();

    // Create an array of the days in the month
    const daysInMonth: Day[] = [];
    for (let index = 1; index <= totalDaysInMonth; index++) {
      // Get the day of the week
      const currentDate = moment.utc(`${year}-${month}-${index}`);
      const day: Day = {
        number: index,
        isSelected: index <= this.numberOfFirstDaysToSelect,
        dayOfWeek: currentDate.isoWeekday(),
      };
      daysInMonth.push(day);
    }

    return { daysInMonth, currentDate: beginningOfMonth };
  }

  private navigateByMonths(months: number) {
    const dateBefore = this.currentDate.clone().add(months, 'month');
    const month = dateBefore.month() + 1;
    const year = dateBefore.year();

    const { daysInMonth, currentDate } = this.getDaysInMonth(month, year);

    this.daysInMonth = daysInMonth;
    this.currentDate = currentDate;
  }

  protected get monthName() {
    return this.currentDate.format('MMMM YYYY');
  }
}
