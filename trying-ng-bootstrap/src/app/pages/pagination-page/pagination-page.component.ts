import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-pagination-page',
  templateUrl: './pagination-page.component.html',
  styleUrls: ['./pagination-page.component.scss'],
})
export class PaginationPageComponent {
  @ViewChild('pagination')
  public pagination!: NgbPagination;

  public page: number = 1;

  public onPageChange(page: number): void {
    console.log('On page change -> Fetch page', page);
  }

  public selectPage(value: string): void {
    this.page = Number(value);
    this.pagination.page = this.page;
    this.pagination.pageChange.emit(this.page);
  }

  public formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
