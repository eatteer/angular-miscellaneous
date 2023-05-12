import { Component } from '@angular/core';
import { ActiveAlert } from '../../classes/active-alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  public constructor(private _activeAlert: ActiveAlert) {}

  public close(): void {
    this._activeAlert.close();
  }
}
