import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CourseTitle } from '../../../features/courses/domain/course-title';

export const CourseTitleValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const title = control.value as string;
  const isValid = CourseTitle.isValid(title)
    ? null
    : { invalidCourseTitle: true };
  return isValid;
};
