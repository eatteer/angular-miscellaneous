import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appDummy]',
})
export class DummyDirective implements OnInit {
  public constructor() {}

  public ngOnInit(): void {
    console.log('DummyDirective.ngOnInit');
  }

  public dummyLog(message: any): void {
    console.log(message);
  }
}
