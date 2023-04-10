import { Component, HostListener } from '@angular/core';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent {
  public constructor(private _previewService: PreviewService) {}

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(): void {
    console.log('leave preview');
    this._previewService.hidePreview();
  }
}
