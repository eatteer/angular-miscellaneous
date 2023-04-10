import { Component, HostBinding, HostListener } from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  animations: [
    trigger('scale', [
      state('void', style({ transform: 'translate(-50%, -50%) scale(0)' })),
      state('*', style({ transform: 'translate(-50%, -50%) scale(1)' })),
      transition(':enter, :leave', [animate('300ms ease')]),
      // transition('void <=> *', [animate('300ms ease')]),
      // transition('void => *', [animate('300ms ease')]),
      // transition('* => void', [animate('300ms ease')]),
    ]),
  ],
})
export class PreviewComponent {
  public constructor(private _previewService: PreviewService) {}

  @HostBinding('@scale')
  //
  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(): void {
    console.log('leave preview');
    this._previewService.hidePreview();
  }
}
