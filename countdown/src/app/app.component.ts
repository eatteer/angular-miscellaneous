import { Component } from '@angular/core';
import { CountdownService } from './services/countdown.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isButtonEnabled = true;
  // Show remaining time while countdown observable is emitting values.
  public showRemainingTime = false;
  public timeLimit = 10;
  public remainingTime = this.timeLimit;

  public constructor(private _countdownService: CountdownService) {}

  public resendCode(): void {
    // Disable button so that the user cannot
    // click it until countdown is zero.
    this.isButtonEnabled = false;
    this.showRemainingTime = true;

    this._countdownService
      .create({ timeLimit: this.timeLimit })
      .subscribe((remainingTime) => {
        this.remainingTime = remainingTime;

        // Enable button when countdown is zero.
        if (remainingTime === 0) {
          this.isButtonEnabled = true;
          this.showRemainingTime = false;
        }
      });
  }
}
