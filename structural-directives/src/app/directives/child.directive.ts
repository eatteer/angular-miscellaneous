import { Directive } from '@angular/core';
import { ParentDirective } from './parent.directive';
import { SiblingDirective } from './sibling.directive';

@Directive({
  selector: '[appChild]',
})
export class ChildDirective {
  public message: string = 'child';

  public constructor(
    private _parentDirective: ParentDirective,
    private _siblingDirective: SiblingDirective
  ) {
    console.log(this._parentDirective.message);
    console.log(this._siblingDirective.message);
  }
}
