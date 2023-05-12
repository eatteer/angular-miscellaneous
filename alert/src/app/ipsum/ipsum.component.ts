import { Component } from '@angular/core';
import { ActiveAlert } from '../alert/classes/active-alert';

@Component({
  selector: 'app-ipsum',
  templateUrl: './ipsum.component.html',
  styleUrls: ['./ipsum.component.scss'],
})
export class IpsumComponent {
  public constructor(private _activeAlert: ActiveAlert) {}

  public close(): void {
    console.log('close');
    this._activeAlert.close();
  }
}
