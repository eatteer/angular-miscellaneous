import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from './services/faker.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';

export interface Record {
  date: Date;
  income: number;
}

export interface ViewableRecords {
  incomes: number[];
  dates: string[];
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('chart')
  public chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  public records: Record[] = [];

  public constructor(private _globalService: GlobalService) {}

  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    this.updateChartForCurrentMonth();
  }

  public updateChartForCurrentMonth(): void {
    const records = this.generateRandomRecords(2013, 6, 8);
    const viewableRecords = this.transformRecords(records);
    this.chartOptions = this.configureChartOptions(viewableRecords);
  }

  public updateChartForMonthBefore(): void {
    const records = this.generateRandomRecords(2013, 5, 8);
    const viewableRecords = this.transformRecords(records);
    this.chartOptions = this.configureChartOptions(viewableRecords);
  }

  public transformRecords(records: Record[]): ViewableRecords {
    const formatDate = this._globalService.formatDate;
    const formatMoney = this._globalService.formatMoney;

    const dates = records.map((record) => formatDate(record.date));
    const incomes = records.map((record) => formatMoney(record.income));

    const viewableData: ViewableRecords = {
      incomes,
      dates,
    };

    return viewableData;
  }

  public configureChartOptions({
    incomes,
    dates,
  }: ViewableRecords): ChartOptions {
    const chartOptions: ChartOptions = {
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      series: [{ name: 'Incomes', data: incomes }],
      xaxis: {
        categories: dates,
      },
      colors: ['#ffbe0b'],
    };

    return chartOptions;
  }

  public generateRandomRecords(
    year: number,
    month: number,
    recordsCount: number
  ) {
    const generateRandomDates = this._globalService.generateRandomDates;
    const generateRandomIncomes = this._globalService.generateRandomIncomes;

    const dates = generateRandomDates(year, month, recordsCount);
    const incomes = generateRandomIncomes(recordsCount);

    const records = dates.map((date, index) => {
      const income = incomes[index];
      const record: Record = {
        date,
        income,
      };
      return record;
    });

    return records;
  }
}
