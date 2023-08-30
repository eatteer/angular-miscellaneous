import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../../../../features/courses/domain/course';
import { CourseCreator } from '../../../../features/courses/application/create/course-creator';
import { CourseFinder } from '../../../../features/courses/application/find/course-finder';

@Injectable()
export class CoursesService {
  private courses$ = new BehaviorSubject<Course[]>([]);

  public constructor(
    private readonly courseCreator: CourseCreator,
    private readonly courseFinder: CourseFinder
  ) {}

  public create({
    title,
    imageUrl,
  }: {
    title: string;
    imageUrl: string;
  }): void {
    const course = Course.fromPrimitives(uuidv4(), title, imageUrl);
    this.courseCreator.create(course);
    this.courses$.next(this.courseFinder.findAll());
  }

  public findAll$() {
    return this.courses$.asObservable();
  }
}
