import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastListComponent } from './components/toast-list/toast-list.component';
import { ToastItemComponent } from './components/toast-item/toast-item.component';

@NgModule({
  declarations: [ToastListComponent, ToastItemComponent],
  imports: [CommonModule],
  exports: [ToastListComponent],
})
export class ToastsModule {}
