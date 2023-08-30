import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styles: [],
})
export class CoursesListComponent {
  public courses$ = this.coursesService.findAll$();

  public constructor(private readonly coursesService: CoursesService) {}
}
