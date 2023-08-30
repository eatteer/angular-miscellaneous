import { Component, Input } from '@angular/core';
import { Toast } from '../../types/toast.interface';

@Component({
  selector: 'app-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.css'],
})
export class ToastItemComponent {
  @Input()
  public toast!: Toast;
}
