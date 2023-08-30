import { Component } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast-list',
  templateUrl: './toast-list.component.html',
  styleUrls: ['./toast-list.component.css'],
})
export class ToastListComponent {
  public constructor(private readonly toastService: ToastService) {}

  public get toasts() {
    return this.toastService.toasts;
  }
}
