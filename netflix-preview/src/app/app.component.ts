import {
  Component,
  ViewChild,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ComponentRef,
  Renderer2,
} from '@angular/core';
import { PreviewService } from './services/preview.service';
import { Subscription } from 'rxjs';
import { PreviewComponent } from './components/preview/preview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('previewContainer', { read: ViewContainerRef })
  private _previewContainerRef!: ViewContainerRef;

  private _previewComponentRef!: ComponentRef<PreviewComponent>;
  private _subscriptions: Subscription[] = [];

  public constructor(
    private _renderer: Renderer2,
    private _previewService: PreviewService
  ) {}

  public ngOnInit(): void {
    const previewSubscription = this._previewService.preview.subscribe(
      (preview) => {
        if (preview.show) {
          this._previewComponentRef =
            this._previewContainerRef.createComponent(PreviewComponent);
          this.setPreviewPosition(preview.position!);
        }

        if (!preview.show) {
          this._previewContainerRef.clear();
        }
      }
    );

    this._subscriptions.push(previewSubscription);
  }

  private setPreviewPosition(position: DOMRect): void {
    const topCenter = position.top + position.height / 2;
    const leftCenter = position.left + position.width / 2;
    this._renderer.setStyle(
      this._previewComponentRef.location.nativeElement,
      'top',
      `${topCenter}px`
    );
    this._renderer.setStyle(
      this._previewComponentRef.location.nativeElement,
      'left',
      `${leftCenter}px`
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
