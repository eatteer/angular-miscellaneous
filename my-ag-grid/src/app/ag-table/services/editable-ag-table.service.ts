import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable()
export class EditableAgTableService {
  private form!: FormGroup;
  public undoAllChanges$: Subject<void> = new Subject();

  public constructor() {}

  public getForm() {
    return this.form;
  }

  /**
   * The names of the controls must be match the coldId
   * of the columns meant to be edited.
   *
   * @example
   * public columnsDef = [
   *  { colId: 'username' },
   *  { colId: 'level' }
   * ]
   *
   * public form = this.formBuilder.group({
   *  username: [''],
   *  level: ['']
   * })
   */
  public setForm(form: FormGroup) {
    this.form = form;
  }
}
