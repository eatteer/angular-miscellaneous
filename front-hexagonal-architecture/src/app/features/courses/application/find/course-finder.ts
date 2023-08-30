import { Injectable } from '@angular/core';
import { CourseRepository } from '../../domain/course.repository';
import { Course } from '../../domain/course';

@Injectable()
export class CourseFinder {
  public constructor(private coursesRepository: CourseRepository) {}

  public findAll(): Course[] {
    return this.coursesRepository.findAll();
  }
}
