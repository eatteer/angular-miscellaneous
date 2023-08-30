export class CourseId {
  public static readonly MIN_LENGTH = 0;

  public constructor(public readonly value: string) {
    if (!CourseId.isValid(value)) {
      throw new Error('Invalid course id');
    }
  }

  public static isValid(value: string): boolean {
    return value.length >= CourseId.MIN_LENGTH;
  }
}
