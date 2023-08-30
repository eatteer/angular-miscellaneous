import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: '[app-tooltip]',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements OnInit {
  public constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.hostElement = this.elementRef.nativeElement;
  }

  @Input()
  /** @description Tooltip id */
  public tid!: string;

  @Input()
  /** @description Tooltip message */
  public tmessage!: string;

  public hostElement!: HTMLElement;

  public ngOnInit(): void {
    this.renderer.setAttribute(
      this.hostElement,
      'data-tooltip-target',
      this.tid
    );
  }
}
