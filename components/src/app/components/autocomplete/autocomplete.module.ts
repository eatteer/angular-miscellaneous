import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkListboxModule } from '@angular/cdk/listbox';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, OverlayModule, CdkListboxModule],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
