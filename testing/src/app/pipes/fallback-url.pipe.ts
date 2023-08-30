import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackUrl',
})
export class FallbackUrlPipe implements PipeTransform {
  public transform(
    value: string,
    fallback: string,
    forceHttps: boolean = false,
    ...args: any[]
  ): string {
    let url = '';

    if (!value) url = fallback;
    else url = value;

    if (forceHttps) url = url.replace('http', 'https');

    return url;
  }
}
