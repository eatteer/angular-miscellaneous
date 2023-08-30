import { InjectionToken } from '@angular/core';
import { Course } from './course';

export const CourseRepository = new InjectionToken<CourseRepository>(
  'CourseRepository'
);

export interface CourseRepository {
  create(course: Course): void;
  findAll(): Course[];
}
