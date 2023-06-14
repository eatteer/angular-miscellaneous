import { Component, ViewChild } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginationComponent {
  @ViewChild('paginator')
  private _paginator!: NgbPagination;

  public paginationChanged$: BehaviorSubject<number> = new BehaviorSubject(1);

  public collectionSize: number = 100;
  public pageSize: number = 10;
  public page: number = 1;

  public selectPage(value: string): void {
    this.page = Number(value);
    this._paginator.page = this.page;
    this._paginator.pageChange.emit(this.page);
  }

  protected _onPageChange(page: number): void {
    this.paginationChanged$.next(page);
  }

  protected _formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
