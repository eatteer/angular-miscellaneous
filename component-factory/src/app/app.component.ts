import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
} from '@angular/core';
import { LoremComponent } from './components/lorem/lorem.component';
import { FooService } from './services/foo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) public document: Document
  ) {
    const loremComponentFactoryResolver =
      this.componentFactoryResolver.resolveComponentFactory(LoremComponent);
    // const loremComponentInjector = Injector.create({
    //   providers: [{ provide: FooService, useClass: FooService }],
    //   parent: this.injector,
    // });
    for (let i = 0; i < 2; i++) {
      const loremComponentRef = loremComponentFactoryResolver.create(
        this.injector
      );
      /*
      Usage of applicationRef.attachView
      https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
      */
      this.applicationRef.attachView(loremComponentRef.hostView);
      // loremComponentRef.changeDetectorRef.detectChanges();
      this.document.body.append(loremComponentRef.location.nativeElement);
    }
  }
}
