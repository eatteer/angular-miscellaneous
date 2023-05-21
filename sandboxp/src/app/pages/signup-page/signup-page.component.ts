import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { PasswordControlComponent } from 'src/app/components/password-control/password-control.component';

export type SignupGroup = {
  password: FormControl<string | null>;
  passwordTwo: FormControl<string | null>;
};

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  @ViewChild('one', { static: true })
  public passwordControlOne!: PasswordControlComponent;

  @ViewChild('two', { static: true })
  public passwordControlTwo!: PasswordControlComponent;

  public form!: FormGroup<SignupGroup>;

  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      password: this.passwordControlOne.createControl(),
      passwordTwo: this.passwordControlTwo.createControl([]),
    });
  }
}
