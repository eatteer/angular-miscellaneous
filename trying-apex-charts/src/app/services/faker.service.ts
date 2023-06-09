import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public generateRandomDates(
    year: number,
    month: number,
    numDates: number
  ): Date[] {
    const dates: Date[] = [];
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const startTimestamp = startOfMonth.getTime();
    const endTimestamp = endOfMonth.getTime();
    const timestampRange = endTimestamp - startTimestamp + 1;

    const selectedTimestamps: Set<number> = new Set();

    while (dates.length < numDates) {
      const randomTimestamp =
        Math.floor(Math.random() * timestampRange) + startTimestamp;

      if (!selectedTimestamps.has(randomTimestamp)) {
        selectedTimestamps.add(randomTimestamp);
        const date = new Date(randomTimestamp);
        dates.push(date);
      }
    }

    dates.sort((a, b) => a.getTime() - b.getTime());

    return dates;
  }

  public generateRandomIncomes(numValues: number): number[] {
    const incomes: number[] = [];

    for (let i = 0; i < numValues; i++) {
      const randomIncome = Math.random() * 100000;
      incomes.push(randomIncome);
    }

    return incomes;
  }

  public formatDates(dates: Date[], locale = 'en-US'): string[] {
    const datePipe = new DatePipe(locale);
    const formattedDates = dates.map((date) => datePipe.transform(date));
    return formattedDates as string[];
  }

  public formatDate(date: Date, locale = 'en-US'): string {
    const datePipe = new DatePipe(locale);
    const formattedDate = datePipe.transform(date);
    return formattedDate as string;
  }

  public formatMoney(value: number): number {
    const formattedValue = value.toFixed(2);
    return parseFloat(formattedValue);
  }
}
