import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoremComponent } from './lorem.component';
import { IpsumService } from '../services/ipsum/ipsum.service';

@NgModule({
  declarations: [LoremComponent],
  imports: [CommonModule],
  providers: [IpsumService],
  exports: [LoremComponent],
})
export class LoremModule {}
