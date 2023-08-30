import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ToastService } from './core/toasts/services/toast/toast.service';
import { ToastVariant } from './core/toasts/types/toast-variant.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public constructor(private readonly toastService: ToastService) {}

  public ngOnInit(): void {
    initFlowbite();
  }

  public openToast(variant: ToastVariant): void {
    this.toastService.open({
      variant: variant,
      message: 'Lorem ipsum dolor sit amet',
      // autoclose: true,
      // autoCloseTime: 2000,
    });
  }
}
