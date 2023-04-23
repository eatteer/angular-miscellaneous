import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

interface SocialNetwork {
  id: string;
  name: string;
}

interface SocialNetworkValidator {
  name: string;
  validUrlExample: string;
  regex: RegExp;
}

const socialNetworkValidators: Record<string, SocialNetworkValidator> = {
  instagram: {
    name: 'Instagram',
    validUrlExample: 'https://www.instagram.com/eatteer/',
    regex:
      /^(?:https:\/\/)?(?:[a-zA-Z0-9]+\.)*instagram\.com\/[a-zA-Z0-9_]+(?:\/)?$/,
  },
  youtube: {
    name: 'Youtube',
    validUrlExample: 'https://www.youtube.com/@username/',
    regex:
      /^(?:https:\/\/)?(?:[a-zA-Z0-9]+\.)*youtube\.(?:com|be)\/(?:c\/|channel\/)?@?[a-zA-Z0-9_-]+(?:\/?)$/,
  },
  twitch: {
    name: 'Twitch',
    validUrlExample: 'https://www.twitch.tv/username/',
    regex:
      /^(?:https:\/\/)?(?:[a-zA-Z0-9]+\.)*twitch\.tv\/[a-zA-Z0-9_]+(?:\/?)$/,
  },
};

const ValidateSocialNetwork =
  (): ValidatorFn => (formGroup: AbstractControl) => {
    // Get controls
    const socialNetworkIdControl = formGroup.get('socialNetworkId');
    const socialNetworkUrlControl = formGroup.get('socialNetworkUrl');

    // Get values
    const id = socialNetworkIdControl?.value as string;
    const url = socialNetworkUrlControl?.value as string;

    // Test network url regex
    const networkUrlRegex = socialNetworkValidators[id].regex;
    const isValidNetworkUrl = networkUrlRegex.test(url);
    !isValidNetworkUrl
      ? socialNetworkUrlControl?.setErrors({
          invalidUrl: {
            validUrlExample: socialNetworkValidators[id].validUrlExample,
          },
        })
      : socialNetworkUrlControl?.setErrors(null);

    return isValidNetworkUrl ? null : {};
  };

export type TSocialNetworkSettingsForm = FormGroup<{
  socialNetworkId: FormControl<string | null>;
  socialNetworkUrl: FormControl<string | null>;
}>;

@Component({
  selector: 'app-social-network-settings',
  templateUrl: './social-network-settings.component.html',
  styleUrls: ['./social-network-settings.component.scss'],
})
export class SocialNetworkSettingsComponent {
  public socialNetworks: SocialNetwork[] = [
    { id: 'instagram', name: 'Instagram' },
    { id: 'youtube', name: 'Youtube' },
    { id: 'twitch', name: 'Twitch' },
  ];

  public form!: TSocialNetworkSettingsForm;

  public constructor(private _fb: FormBuilder) {}

  public createForm() {
    this.form = this._fb.group(
      {
        socialNetworkId: [this.socialNetworks[0].id, [Validators.required]],
        socialNetworkUrl: ['', [Validators.required]],
      },
      { validators: [ValidateSocialNetwork()] }
    );
    return this.form;
  }

  public get socialNetworkIdControl() {
    return this.form.controls.socialNetworkId;
  }

  public get socialNetworkUrlControl() {
    return this.form.controls.socialNetworkUrl;
  }

  public get socialNetworkValidUrlExample() {
    const invalidUrlError = this.socialNetworkUrlControl.getError('invalidUrl');
    const validUrlExample = invalidUrlError?.validUrlExample;
    return validUrlExample;
  }
}
