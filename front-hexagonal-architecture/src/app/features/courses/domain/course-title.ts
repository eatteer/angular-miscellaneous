export class CourseTitle {
  public static readonly MIN_LENGTH = 3;
  public static readonly MAX_LENGTH = 50;

  public constructor(public readonly value: string) {
    if (!CourseTitle.isValid(value)) {
      throw new Error('Invalid course title');
    }
  }

  public static isValid(value: string): boolean {
    return (
      value.length >= CourseTitle.MIN_LENGTH &&
      value.length <= CourseTitle.MAX_LENGTH
    );
  }
}
