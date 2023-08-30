import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MultiselectComponent } from './multiselect.component';

@NgModule({
  declarations: [MultiselectComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, OverlayModule],
  exports: [MultiselectComponent],
})
export class MultiselectModule {}
