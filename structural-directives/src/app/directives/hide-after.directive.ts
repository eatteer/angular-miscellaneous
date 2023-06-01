import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';

export interface Context {
  appHideAfter: number;
}

@Directive({
  selector: '[appHideAfter]',
})
export class HideAfterDirective implements OnInit {
  @Input('appHideAfter')
  public delay: number = 0;

  @Input('appHideAfterThen')
  public placeholder?: TemplateRef<Context>;

  private _context!: Context;

  public constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>
  ) {}

  public ngOnInit(): void {
    this._context = {
      appHideAfter: this.delay / 1000,
    };

    this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);

    const intervalId = setInterval(() => {
      this._context.appHideAfter -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      this._viewContainerRef.clear();

      if (this.placeholder) {
        this._viewContainerRef.createEmbeddedView(this.placeholder);
      }
    }, this.delay);
  }
}
