import { Component } from '@angular/core';
import { ActiveAlert } from '../alert/classes/active-alert';

@Component({
  selector: 'app-lorem',
  templateUrl: './lorem.component.html',
  styleUrls: ['./lorem.component.scss'],
})
export class LoremComponent {
  public constructor(private _activeAlert: ActiveAlert) {}

  public close(): void {
    this._activeAlert.close();
  }
}
