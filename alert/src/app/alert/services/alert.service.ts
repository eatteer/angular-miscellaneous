import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Inject,
  Type,
} from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { DOCUMENT } from '@angular/common';
import { ActiveAlert } from '../classes/active-alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alertFactory: ComponentFactory<AlertComponent>;

  public constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._alertFactory =
      this._componentFactoryResolver.resolveComponentFactory(AlertComponent);
  }

  public open(component: Type<any>) {
    let activeAlert: ActiveAlert = { close: () => {} };

    // Injector for the component meant to be open and the alert component
    const commonInjector = Injector.create({
      parent: this._injector,
      providers: [{ provide: ActiveAlert, useValue: activeAlert }],
    });

    // Create projectable component
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(commonInjector);

    // Create alert component
    const alertComponentRef = this._alertFactory.create(commonInjector, [
      [componentRef.location.nativeElement],
    ]);

    activeAlert.close = () => {
      // Detach alert component from Angular component tree
      this._applicationRef.detachView(alertComponentRef.hostView);
      alertComponentRef.destroy();
    };

    // Attach alert component to Angular component tree
    this._applicationRef.attachView(alertComponentRef.hostView);
    this._document.body.appendChild(alertComponentRef.location.nativeElement);

    return alert;
  }
}
