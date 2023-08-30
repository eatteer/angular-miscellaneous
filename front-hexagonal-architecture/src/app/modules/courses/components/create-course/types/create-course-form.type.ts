import { FormControl, FormGroup } from '@angular/forms';

export type CreateCourseForm = FormGroup<{
  title: FormControl<string>;
  imageUrl: FormControl<string>;
}>;
