import { FormControl, FormGroup } from '@angular/forms';

export type CreateNoteForm = FormGroup<{
  title: FormControl<string>;
  content: FormControl<string>;
}>;
