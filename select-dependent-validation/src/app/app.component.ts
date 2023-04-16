import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialNetworkSettingsComponent } from './components/social-network-settings/social-network-settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(private _modalService: NgbModal) {}

  public openSocialNetworkSettingsModal(): void {
    this._modalService.open(SocialNetworkSettingsComponent, { size: 'lg' });
  }
}
