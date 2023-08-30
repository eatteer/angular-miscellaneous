import { Component } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public constructor(private readonly swUpdate: SwUpdate) {
    this.checkForAppUpdate();
  }

  private checkForAppUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((versionEvent: VersionEvent) => {
        if (versionEvent.type === 'VERSION_READY') {
          if (confirm('New version available. Load New Version?')) { 
            window.location.reload();
          }
        }
      });
    }
  }
}
