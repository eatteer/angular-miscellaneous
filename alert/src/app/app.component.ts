import { Component } from '@angular/core';
import { AlertService } from './alert/services/alert.service';
import { LoremComponent } from './lorem/lorem.component';
import { IpsumComponent } from './ipsum/ipsum.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(private _alertService: AlertService) {}

  public openLoremAlert(): void {
    this._alertService.open(LoremComponent);
  }

  public openIpsumAlert(): void {
    this._alertService.open(IpsumComponent);
  }

  public get openAlerts(): number {
    return this._alertService.openAlerts.length;
  }
}
