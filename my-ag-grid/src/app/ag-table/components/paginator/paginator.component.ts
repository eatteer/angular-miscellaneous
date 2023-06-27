import { Component, ViewChild } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @ViewChild('paginator')
  public paginator!: NgbPagination;

  public paginationChanged$ = new Subject<number>();

  public collectionSize: number = 100;
  public pageSize: number = 10;

  private shouldEmit = true;
  private passThroughtSelect = false;

  public selectPage(value: string, shouldEmitPaginationChanged: boolean): void {
    this.passThroughtSelect = true;
    this.shouldEmit = shouldEmitPaginationChanged;

    const page = Number(value);
    this.paginator.page = page;
    this.paginator.pageChange.emit(page);
  }

  protected onPageChange(page: number): void {
    if (!this.passThroughtSelect) {
      this.paginationChanged$.next(page);
    }

    if (this.passThroughtSelect && this.shouldEmit) {
      this.paginationChanged$.next(page);
    }

    this.passThroughtSelect = false;
  }

  protected formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
