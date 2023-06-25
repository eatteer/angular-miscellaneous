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

  @Input()
  public message!: string;

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

  @HostListener('mouseenter')
  private _showOnMouseEnter(): void {
    if (this.trigger === 'auto') {
      this._createTooltip();
    }
  }

  @HostListener('mouseleave')
  private _hideOnMouseLeave(): void {
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

    if (this.template) {
      const templatePortal = new TemplatePortal(
        this.template,
        this._containerRef
      );
      this._overlayRef.attach(templatePortal);
    } else {
      const tooltipComponentPortal = new ComponentPortal(TooltipComponent);
      const tooltipComponentRef = this._overlayRef.attach(
        tooltipComponentPortal
      );
      tooltipComponentRef.instance.message = this.message;
    }
  }

  private _removeTooltip(): void {
    this._overlayRef?.detach();
    this._overlayRef = null;
  }
}
