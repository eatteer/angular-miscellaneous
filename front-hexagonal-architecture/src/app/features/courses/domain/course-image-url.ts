export class CourseImageUrl {
  public static readonly REGEX: RegExp =
    /^(https?|ftp):\/\/([A-Z0-9.-]+(:\d+)?)(\/[^?\s]*)?$/i;

  public constructor(public readonly value: string) {
    if (!CourseImageUrl.isValid(value)) {
      throw new Error('Invalid course image url');
    }
  }

  public static isValid(value: string): boolean {
    return this.REGEX.test(value);
  }
}
