import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CourseImageUrl } from '../../../features/courses/domain/course-image-url';

export const CourseImageUrlValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const imageUrl = control.value as string;
  const isValid = CourseImageUrl.isValid(imageUrl)
    ? null
    : { invalidCourseImageUrl: true };
  return isValid;
};
