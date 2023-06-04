import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { AgTableService } from './ag-table.service';

@Injectable()
export class EditableAgTableService {
  private _form!: FormGroup;
  public undoAllChanges$: Subject<void> = new Subject();

  public constructor() {}

  public getForm() {
    return this._form;
  }

  public setForm(form: FormGroup) {
    this._form = form;
  }
}
