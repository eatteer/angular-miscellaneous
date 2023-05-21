import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { PasswordControlComponent } from 'src/app/components/password-control/password-control.component';

export type SignupGroup = {
  password: FormControl<string | null>;
};

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  @ViewChild(PasswordControlComponent, { static: true })
  public passwordControl!: PasswordControlComponent;

  public form!: FormGroup<SignupGroup>;

  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      password: this.passwordControl.createControl(),
    });
  }
}
