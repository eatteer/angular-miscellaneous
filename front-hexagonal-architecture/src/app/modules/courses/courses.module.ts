import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesService } from './services/courses/courses.service';
import { CourseCreator } from '../../features/courses/application/create/course-creator';
import { CourseFinder } from '../../features/courses/application/find/course-finder';
import { CourseRepository } from '../../features/courses/domain/course.repository';
import { InMemoryCourseRepository } from '../../features/courses/infrastructure/in-memory-course-repository/in-memory-course.repository';
import { LocalStorageCourseRepository } from 'src/app/features/courses/infrastructure/local-storage-course-repository/local-storage-course.repository';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CreateCourseComponent,
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    /**
     * CoursesService is called from components
     * and uses CourseCreator and CourseFinder use cases.
     */
    CoursesService,
    /**
     * CourseCreator is an use case that uses CourseRepository.
     */
    CourseCreator,
    /**
     * CourseFinder is an use case that uses CourseRepository.
     */
    CourseFinder,
    {
      provide: CourseRepository,
      useClass: InMemoryCourseRepository,
    },
  ],
})
export class CoursesModule {}
