import { Component, ViewChild } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination-page',
  templateUrl: './pagination-page.component.html',
  styleUrls: ['./pagination-page.component.scss'],
})
export class PaginationPageComponent {
  @ViewChild('pagination')
  public pagination!: NgbPagination;

  public page: number = 1;

  public onPageChange(page: number | string): void {
    console.log('On page change -> Fetch page', page);
  }

  public selectPage(value: string): void {
    const pageSize = this.pagination.pageSize;
    const page = this.setPage(Number(value), pageSize);
    // Trigger manually pageChange event emitter that runs onPageChange
    this.pagination.pageChange.emit(page);
  }

  public setPage(page: number, pageSize: number): number {
    if (page > pageSize) return pageSize;
    if (page < 1) return 1;
    return page;
  }
}
