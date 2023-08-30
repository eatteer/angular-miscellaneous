import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

@NgModule({
  declarations: [NotesPageComponent],
  imports: [CommonModule, NotesRoutingModule, ReactiveFormsModule],
})
export class NotesModule {}
