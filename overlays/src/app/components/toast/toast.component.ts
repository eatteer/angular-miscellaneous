import { Component, Input } from '@angular/core';
import { ToastVariant } from './toast.types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  @Input()
  public title!: string;

  @Input()
  public message!: string;

  @Input()
  public variant!: ToastVariant;

  @Input()
  public closable!: boolean;

  @Input()
  public autoclose!: boolean;

  @Input()
  public timeout!: number;

  public getClasses() {
    return {
      'bg-white': this.variant === 'white',
      'bg-green-100': this.variant === 'success',
      'bg-yellow-100': this.variant === 'warning',
      'bg-red-100': this.variant === 'danger',
    };
  }
}
