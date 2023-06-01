import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit,
} from '@angular/core';

export interface User {
  username: string;
  level: number;
}

export interface Context {
  $implicit: User;
}

@Directive({
  selector: '[appProvideData]',
})
export class ProvideDataDirective implements OnInit {
  @Input('appProvideData')
  public username: string = 'debviluke';

  @Input('appProvideDataLevel')
  public level: number = 99;

  public constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<Context>
  ) {}

  public ngOnInit(): void {
    const context: Context = {
      $implicit: {
        username: this.username,
        level: this.level,
      },
    };
    this._viewContainerRef.createEmbeddedView(this._templateRef, context);
  }
}
