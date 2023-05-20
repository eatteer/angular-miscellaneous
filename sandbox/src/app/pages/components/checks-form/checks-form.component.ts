import { Component } from '@angular/core';
import { Groups, GroupsControls } from './check-form.types';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checks-form',
  templateUrl: './checks-form.component.html',
  styleUrls: ['./checks-form.component.scss'],
})
export class ChecksFormComponent {
  private _groups: Groups<GroupsControls> = {
    groupByDate: ['groupByCampaign'],
    groupByMonth: ['groupByCampaign'],
  };

  public form!: FormGroup<GroupsControls>;

  public constructor(private _formBuilder: FormBuilder) {}

  public createForm() {
    this.form = this._formBuilder.group({
      groupByDate: [false],
      groupByMonth: [false],
      groupByCampaign: [false],
    });

    this._checkGroupSwitchesOnSwitchCheck();

    return this.form;
  }

  /**
   * Subscribe to value changes for every switch in the form,
   * and if the user checks a switch, then also check the corresponding switches defined
   * at {@link _groups}
   */
  private _checkGroupSwitchesOnSwitchCheck(): void {
    // Subscribe to valueChange for every switch in the form
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.valueChanges.subscribe((isChecked) => {
        // If the user checks a switch, then also check the corresponding switches
        if (isChecked) {
          const currentKey = key as keyof typeof this._groups;
          this._groups[currentKey]?.forEach((key) => {
            this.form.get(key)?.setValue(true);
          });
        }
      });
    });
  }
}
