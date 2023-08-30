import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  public ICONS_PATH: string = 'assets/icons';

  @Input()
  public totalItems: number = 0;

  @Input()
  public itemsPerPage: number = 0;

  @Output()
  public paginationChange = new EventEmitter<{
    limit: number;
    offset: number;
  }>();

  public maxPaginationSlices: number = 5;
  public paginationSlices: number = 0;

  public totalPages: number = 0;
  public currentPage: number = 1;
  public pagesSlice: { number: number; isCurrent: boolean }[] = [];

  public ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePagesSlice();
  }

  private createPagesSlice(
    start: number
  ): { number: number; isCurrent: boolean }[] {
    this.paginationSlices = Math.min(this.totalPages, this.maxPaginationSlices);

    return Array.from({ length: this.paginationSlices }, (_, i) => ({
      number: i + start,
      isCurrent: this.currentPage === i + start,
    }));
  }

  private generatePagesSlice(): void {
    const floorHalfOfPaginationSlices = Math.floor(this.paginationSlices / 2);
    const minStart = 1;
    const maxStart = this.totalPages - floorHalfOfPaginationSlices * 2;

    // If current page is less than half of the pagination slices.
    if (this.currentPage < floorHalfOfPaginationSlices) {
      const start = minStart;
      this.pagesSlice = this.createPagesSlice(start);
      return;
    }

    // If current page is greater than the total pages minus half of the pagination slices.
    if (this.currentPage > this.totalPages - floorHalfOfPaginationSlices) {
      const start = Math.max(minStart, maxStart);
      this.pagesSlice = this.createPagesSlice(start);
      return;
    }

    // If current page is in the middle of the pagination slices.
    const start = Math.max(
      minStart,
      this.currentPage - floorHalfOfPaginationSlices
    );
    this.pagesSlice = this.createPagesSlice(start);
  }

  private calculateLimitAndOffset = () => {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    return { limit, offset };
  };

  private emitPaginationChange(): void {
    this.paginationChange.emit(this.calculateLimitAndOffset());
  }

  public setPage(page: number): void {
    this.currentPage = page;
    this.generatePagesSlice();
    this.emitPaginationChange();
  }

  public setFirstPage(): void {
    this.currentPage = 1;
    this.generatePagesSlice();
    this.emitPaginationChange();
  }

  public setLastPage(): void {
    this.currentPage = this.totalPages;
    this.generatePagesSlice();
    this.emitPaginationChange();
  }

  public setPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.generatePagesSlice();
      this.emitPaginationChange();
    }
  }

  public setNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.generatePagesSlice();
      this.emitPaginationChange();
    }
  }

  public get thereAreItems(): boolean {
    return this.totalItems > 0;
  }
}
