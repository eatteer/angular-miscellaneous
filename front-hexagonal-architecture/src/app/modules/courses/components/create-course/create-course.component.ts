import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses/courses.service';
import { CourseImageUrlValidator } from '../../validators/course-image-url.validator';
import { CourseTitleValidator } from '../../validators/course-title.validator';
import { CreateCourseForm } from './types/create-course-form.type';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styles: [],
})
export class CreateCourseComponent implements OnInit {
  public createCourseForm!: CreateCourseForm;

  public constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly coursesService: CoursesService
  ) {}

  public ngOnInit(): void {
    this.buildCreateCourseForm();
  }

  public createCourse(): void {
    const { title, imageUrl } = this.createCourseForm.getRawValue();
    this.coursesService.create({ title, imageUrl });
    this.createCourseForm.reset();
  }

  public setRandomImageUrl(): void {
    // Get random image from https://picsum.photos/
    const randomImageId = Math.floor(Math.random() * 1000);
    const randomImageUrl = `https://picsum.photos/id/${randomImageId}/200`;
    this.createCourseForm.controls.imageUrl.setValue(randomImageUrl);
  }

  private buildCreateCourseForm(): void {
    this.createCourseForm = this.formBuilder.group({
      title: ['', [CourseTitleValidator]],
      imageUrl: ['', [CourseImageUrlValidator]],
    });
  }

  public get isCreateFormValid(): boolean {
    return this.createCourseForm.controls.title.valid;
  }
}
