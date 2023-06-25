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
})
export class TooltipDirective {
  private _overlayRef!: OverlayRef;

  @Input()
  public template?: TemplateRef<any>;

  public constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef<HTMLElement>,
    private _containerRef: ViewContainerRef
  ) {}

  @HostListener('mouseover')
  public createTooltip(): void {
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

  @HostListener('mouseout')
  public removeTooltip(): void {
    this._overlayRef.detach();
  }
}
