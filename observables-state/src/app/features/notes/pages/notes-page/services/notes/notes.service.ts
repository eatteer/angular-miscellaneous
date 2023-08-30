import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../../types/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  public getNotes$(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  public getNotes(): Note[] {
    return this.notes$.getValue();
  }

  public getNextId(): number {
    return this.getNotes().length + 1;
  }

  public createNote(note: Note): void {
    this.notes$.next([...this.getNotes(), note]);
  }
}
