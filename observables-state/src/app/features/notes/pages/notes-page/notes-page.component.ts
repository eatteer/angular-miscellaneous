import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CreateNoteForm } from './types/create-note-form';
import { NotesService } from './services/notes/notes.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent implements OnInit {
  public notes$ = this.notesService.getNotes$();

  public createNoteForm!: CreateNoteForm;

  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private notesService: NotesService
  ) {}

  public ngOnInit(): void {
    this.createNoteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  public createNote(): void {
    const { title, content } = this.createNoteForm.getRawValue();
    
    this.notesService.createNote({
      id: this.notesService.getNextId(),
      title,
      content,
    });

    this.createNoteForm.reset();
  }
}
