import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  SocialNetworkSettingsComponent,
  TSocialNetworkSettingsForm,
} from '../social-network-settings/social-network-settings.component';

export type TSignupForm = FormGroup<{
  username: FormControl<string | null>;
  socialNetworkSettings: TSocialNetworkSettingsForm;
}>;

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  /**
   * Reference to reusable social network settings form for combining with this signup form
   */
  @ViewChild(SocialNetworkSettingsComponent, { static: true })
  public socialNetworkSettingsComponent!: SocialNetworkSettingsComponent;

  public form!: TSignupForm;

  public constructor(private _fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.form = this._fb.group({
      username: ['', [Validators.required]],
      /**
       * Social network settings form as sub form group for this signup form
       */
      socialNetworkSettings: this.socialNetworkSettingsComponent.createForm(),
    });
  }
}
