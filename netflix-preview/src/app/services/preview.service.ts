import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IPreview, TPreviewConfig } from '../interfaces/preview';

@Injectable({
  providedIn: 'root',
})
export class PreviewService {
  private _preview$ = new Subject<IPreview>();
  public stayFor = 700;

  public get preview(): Observable<IPreview> {
    return this._preview$.asObservable();
  }

  public showPreview({ data, position }: TPreviewConfig): void {
    const preview: IPreview = { show: true, data, position };
    this._preview$.next(preview);
  }

  public hidePreview(): void {
    const preview: IPreview = { show: false };
    this._preview$.next(preview);
  }
}
