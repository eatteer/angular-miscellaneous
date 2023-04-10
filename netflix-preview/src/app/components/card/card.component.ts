import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { TPreviewConfig } from 'src/app/interfaces/preview';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  private _timeoutId: any;

  public constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _previewService: PreviewService
  ) {}

  public ngOnInit(): void {}

  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(): void {
    console.log('enter card');
    this._timeoutId = setTimeout(() => {
      const previewConfig: TPreviewConfig = {
        data: {},
        position: this._elementRef.nativeElement.getBoundingClientRect(),
      };
      this._previewService.showPreview(previewConfig);
    }, this._previewService.stayFor);
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(): void {
    console.log('leave card');
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }
}
