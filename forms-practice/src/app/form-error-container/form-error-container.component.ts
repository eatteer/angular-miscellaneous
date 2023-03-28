import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-errors',
  templateUrl: './form-error-container.component.html',
  styleUrls: ['./form-error-container.component.css'],
})
export class FormErrorContainerComponent {
  /*
  - Receive control [reference] from outside.
  - Update the view by running the change detection mechanism.
  - Since the view is using {control.invalid},
  the change detection mechanism checks this property and if
  there if changes then the view is re-rendered.
  */

  @Input()
  control!: AbstractControl;
}
