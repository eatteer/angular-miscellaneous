import { Injectable } from '@angular/core';
import { CourseRepository } from '../../domain/course.repository';
import { Course } from '../../domain/course';

@Injectable()
export class CourseCreator {
  public constructor(private readonly courseRepository: CourseRepository) {}

  public create(course: Course): void {
    this.courseRepository.create(course);
  }
}
