import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
} from '@angular/core';
import { LoremComponent } from './components/lorem/lorem.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: Document
  ) {
    const loremFactoryResolver =
      this._componentFactoryResolver.resolveComponentFactory(LoremComponent);
    const loremComponentRef = loremFactoryResolver.create(this._injector);
    this._document.body.append(loremComponentRef.location.nativeElement);
  }
}
