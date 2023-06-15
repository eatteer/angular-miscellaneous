import { Component, ViewChild } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginationComponent {
  @ViewChild('paginator')
  public paginator!: NgbPagination;

  public paginationChanged$: BehaviorSubject<number> = new BehaviorSubject(1);

  public collectionSize: number = 100;
  public pageSize: number = 10;

  private _shouldEmit = true;
  private _passThroughtSelect = false;

  public selectPage(value: string, shouldEmit = true): void {
    this._passThroughtSelect = true;
    this._shouldEmit = shouldEmit;

    const page = Number(value);
    this.paginator.page = page;
    this.paginator.pageChange.emit(page);
  }

  protected _onPageChange(page: number): void {
    if (!this._passThroughtSelect) {
      this.paginationChanged$.next(page);
    }

    if (this._passThroughtSelect && this._shouldEmit) {
      this.paginationChanged$.next(page);
    }

    this._passThroughtSelect = false;
  }

  protected _formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
