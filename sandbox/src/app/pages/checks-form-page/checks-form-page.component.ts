import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Groups, GroupsControls } from './check-form.types';

@Component({
  selector: 'app-checks-form-page',
  templateUrl: './checks-form-page.component.html',
  styleUrls: ['./checks-form-page.component.scss'],
})
export class ChecksFormPageComponent implements OnInit, OnDestroy {
  private _groups: Groups<GroupsControls> = {
    groupByDate: ['groupByCampaign'],
    groupByMonth: ['groupByCampaign'],
  };

  private _subscriptions: Subscription[] = [];

  public form!: FormGroup<GroupsControls>;

  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.createForm();
    this._checkGroupSwitchesOnSwitchCheck();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public createForm() {
    this.form = this._formBuilder.group({
      groupByDate: [false],
      groupByMonth: [false],
      groupByCampaign: [false],
    });

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
          this._groups[key as keyof typeof this._groups]?.forEach((key) => {
            this.form.get(key)?.setValue(true);
          });
        }
      });
    });
  }
}
