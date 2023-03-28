import { Directive, Input } from '@angular/core';
import { NgControl, FormControlName } from '@angular/forms';

@Directive({
  selector: '[appDisabledIf]',
})
export class DisabledIfDirective {
  @Input()
  public set appDisabledIf(value: boolean) {
    const control = this.formControlName.control;
    value ? control?.disable() : control?.enable();
  }

  /*
    Get the FormControlName directive instance from
    the input on which this directive is applied.

    Since formControlName and appDisabledIf directives
    are applied to the same element, both directives
    can access each other dependencies. This is
    because each directive has its own injector, so when
    searching a dependency that is not found within the
    own injector, the search is forwarded to the next injector
    of the sibling directive.

    In other words, directives applied on the same element share
    the same injector tree.
  */
  // public constructor(public ngControl: NgControl) {}
  public constructor(public formControlName: FormControlName) {}
}
