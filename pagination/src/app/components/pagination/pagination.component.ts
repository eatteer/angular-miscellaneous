import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input()
  public totalItems!: number;

  @Input()
  public itemsPerPage!: number;

  @Input()
  public currentPage: number = 1;

  @Output()
  public onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] && changes['itemsPerPage']) {
      const numberOfPages = this.caculateNumberOfPages(
        changes['totalItems'].currentValue,
        changes['itemsPerPage'].currentValue
      );
      this.pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
    }
  }

  public changePage(page: number): void {
    this.currentPage = page;
    this.onPageChange.emit(page);
  }

  private caculateNumberOfPages(
    totalItems: number,
    itemsPerPage: number
  ): number {
    const numberOfPages = Math.ceil(totalItems / itemsPerPage);
    return numberOfPages;
  }
}
