import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]',
  exportAs: 'appTooltip',
})
export class TooltipDirective {
  private _overlayRef: OverlayRef | null = null;

  @Input()
  public trigger: 'auto' | 'manual' = 'auto';

  @Input()
  public template?: TemplateRef<any>;

  public constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef<HTMLElement>,
    private _containerRef: ViewContainerRef
  ) {}

  public show(): void {
    // Do not create a tooltip if there is already one
    if (this._overlayRef) return;
    this._createTooltip();
  }

  public hide(): void {
    this._removeTooltip();
  }

  @HostListener('mouseover')
  private _showOnMouseOver(): void {
    if (this.trigger === 'auto') {
      this._createTooltip();
    }
  }

  @HostListener('mouseout')
  private _hideOnMouseOut(): void {
    if (this.trigger === 'auto') {
      this._removeTooltip();
    }
  }

  private _createTooltip(): void {
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef)
        .withPositions([
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -4,
          },
        ]),
    });

    let componentPortal = this.template
      ? new TemplatePortal(this.template, this._containerRef)
      : new ComponentPortal(TooltipComponent);

    this._overlayRef.attach(componentPortal);
  }

  private _removeTooltip(): void {
    this._overlayRef?.detach();
    this._overlayRef = null;
  }
}
