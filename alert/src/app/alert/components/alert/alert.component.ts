import { ApplicationRef, Component, ComponentRef } from '@angular/core';
import { Alert } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  public selfAlert!: Alert;

  public constructor() {}

  public close(): void {
    this.selfAlert.close();
  }
}
