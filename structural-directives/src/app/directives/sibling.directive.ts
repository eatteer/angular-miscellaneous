import { Directive } from '@angular/core';

@Directive({
  selector: '[appSibling]',
})
export class SiblingDirective {
  public message: string = 'sibling';
}
