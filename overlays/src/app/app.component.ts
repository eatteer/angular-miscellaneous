import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ToastService } from './components/toast/toast.service';
import { ToastConfig, ToastVariant } from './components/toast/toast.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public periods = [
    { displayValue: 'Select a period', value: '' },
    { displayValue: 'Current month', value: 'currentMonth' },
    { displayValue: 'Today', value: 'today' },
    { displayValue: 'Yesterday', value: 'yesterday' },
  ];

  public form = this._fb.group({ period: ['currentMonth'] });

  public constructor(
    private _fb: NonNullableFormBuilder,
    private _toastService: ToastService
  ) {}

  public openToast(toastConfig: ToastConfig): void {
    this._toastService.open(toastConfig);
  }

  private _generateRandomText(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters.charAt(randomIndex);
    }

    return randomText;
  }
}
