import { Injectable } from '@angular/core';
import { CourseRepository } from '../../domain/course.repository';
import { Course } from '../../domain/course';

@Injectable()
export class LocalStorageCourseRepository implements CourseRepository {
  public create(course: Course): void {
    this.saveCourse(course);
  }

  public findAll(): Course[] {
    const rawCourses = localStorage.getItem('courses');
    const courses = this.parseCourses(rawCourses);
    return courses;
  }

  private parseCourses(rawCourses: string | null): Course[] {
    return JSON.parse(rawCourses ?? '[]');
  }

  private saveCourse(course: Course): void {
    localStorage.setItem(
      'courses',
      JSON.stringify([...this.findAll(), course])
    );
  }
}
