import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appParent]',
})
export class ParentDirective {
  @Input()
  public message: string = '';
}
