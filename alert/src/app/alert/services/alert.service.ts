import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Inject,
  Type,
  ComponentRef,
} from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { DOCUMENT } from '@angular/common';

export interface Alert {
  index: number;
  alertComponentRef: ComponentRef<AlertComponent>;
  close: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public openAlerts: Alert[] = [];
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

  public open(component: Type<any>): Alert {
    // Create projectable component
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this._injector);

    // Create alert component
    const alertComponentRef = this._alertFactory.create(this._injector, [
      [componentRef.location.nativeElement],
    ]);

    // Define the index of the alert
    const index: number = this.openAlerts.length;

    const alert = {
      index,
      alertComponentRef,
      close: () => {
        // Detach alert component from Angular component tree
        this._applicationRef.detachView(alertComponentRef.hostView);
        alertComponentRef.destroy();
        // Remove alert
        this.openAlerts.splice(index);
      },
    };

    alertComponentRef.instance.selfAlert = alert;

    // Attach alert component to Angular component tree
    this._applicationRef.attachView(alertComponentRef.hostView);
    this._document.body.appendChild(alertComponentRef.location.nativeElement);

    this.openAlerts.push(alert);

    return alert;
  }
}
