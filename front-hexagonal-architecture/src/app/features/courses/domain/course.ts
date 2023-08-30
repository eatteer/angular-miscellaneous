import { CourseId } from './course-id';
import { CourseImageUrl } from './course-image-url';
import { CourseTitle } from './course-title';

export class Course {
  private constructor(
    public readonly courseId: CourseId,
    public readonly courseTitle: CourseTitle,
    public readonly courseImageUrl: CourseImageUrl
  ) {}

  public static fromPrimitives(
    id: string,
    title: string,
    imageUrl: string
  ): Course {
    return new Course(
      new CourseId(id),
      new CourseTitle(title),
      new CourseImageUrl(imageUrl)
    );
  }

  public toPrimitives(): {
    id: string;
    title: string;
    imageUrl: string;
  } {
    return {
      id: this.id,
      title: this.title,
      imageUrl: this.imageUrl,
    };
  }

  public get id(): string {
    return this.courseId.value;
  }

  public get title(): string {
    return this.courseTitle.value;
  }

  public get imageUrl(): string {
    return this.courseImageUrl.value;
  }
}
