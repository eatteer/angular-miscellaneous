import { Injectable } from '@angular/core';
import { CourseRepository } from '../../domain/course.repository';
import { Course } from '../../domain/course';

@Injectable()
export class InMemoryCourseRepository implements CourseRepository {
  public courses: Course[] = [];

  public constructor() {}

  public create(course: Course) {
    this.saveCourse(course);
  }

  public findAll(): Course[] {
    return this.courses;
  }

  private saveCourse(course: Course): void {
    this.courses = [...this.courses, course];
  }
}
