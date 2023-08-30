import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from '../../types/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toasts: Toast[] = [];

  public open(toast: Toast): void {
    toast.id = uuidv4();
    this.toasts = [...this.toasts, toast];
    this.autoclose(toast);
  }

  private autoclose(toast: Toast): void {
    if (toast.autoclose) {
      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t !== toast);
      }, toast.autoCloseTime);
    }
  }
}
