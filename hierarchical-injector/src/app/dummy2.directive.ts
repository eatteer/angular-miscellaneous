import { Directive, OnInit, Input } from '@angular/core';
import { DummyDirective } from './dummy.directive';

@Directive({
  selector: '[appDummy2]',
})
export class Dummy2Directive implements OnInit {
  public constructor(private dummyDirective: DummyDirective) {}

  public ngOnInit(): void {
    console.log('Dummy2Directive.ngOnInit');
    this.dummyDirective.dummyLog(
      'DummyDirective.dummyLog from Dummy2Directive.ngOnInit'
    );
  }

  public dummyLog(message: any): void {
    console.log(message);
  }
}
