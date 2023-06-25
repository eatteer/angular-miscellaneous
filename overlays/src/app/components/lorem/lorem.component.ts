import { Component } from '@angular/core';
import { ActiveToast } from '../toast/active-toast';

@Component({
  selector: 'app-lorem',
  templateUrl: './lorem.component.html',
  styleUrls: ['./lorem.component.css'],
})
export class LoremComponent {
  public constructor(private _activeToast: ActiveToast) {}

  public closeToast(): void {
    this._activeToast.close();
  }
}
