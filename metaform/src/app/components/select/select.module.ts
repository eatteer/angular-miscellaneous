import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';
import { PropertyByPathPipe } from 'src/app/pipes/property-by-path/property-by-path.pipe';

@NgModule({
  declarations: [SelectComponent, PropertyByPathPipe],
  imports: [CommonModule, FormsModule],
  exports: [SelectComponent],
})
export class SelectModule {}
