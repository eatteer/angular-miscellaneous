import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ToastService } from './components/toast/toast.service';
import { ToastConfig, ToastVariant } from './components/toast/toast.types';
import { LoremComponent } from './components/lorem/lorem.component';

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

  public openWhiteToast(): void {
    this._toastService.open({
      title: 'Boring toast',
      message: 'Just live your life',
    });
  }

  public openSucessToast(): void {
    this._toastService.open({
      title: 'Successfully registerd',
      message: 'You were successfully registered',
      variant: 'success',
    });
  }

  public openLoremToast(): void {
    this._toastService.openWith(LoremComponent);
  }
}
