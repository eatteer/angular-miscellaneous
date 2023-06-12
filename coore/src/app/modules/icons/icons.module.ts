import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverableIconDirective } from './directives/hoverable-icon.directive';

@NgModule({
  declarations: [HoverableIconDirective],
  imports: [CommonModule],
  exports: [HoverableIconDirective],
})
export class IconsModule {}
