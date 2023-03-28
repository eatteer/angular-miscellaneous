import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  public disabledUsername = false;

  public form = this.fb.group({ username: ['debviluke'] });

  public constructor(private fb: FormBuilder) {}

  public toggleDisabledUsername(): void {
    this.disabledUsername = !this.disabledUsername;
    console.log(this.disabledUsername);
  }
}
