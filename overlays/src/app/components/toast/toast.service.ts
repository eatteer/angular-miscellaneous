import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
} from '@angular/core';
import { ToastsContainerComponent } from '../toasts-container/toasts-container.component';
import { ToastComponent } from './toast.component';
import { ToastConfig } from './toast.types';

const defaultToastConfig: Partial<ToastConfig> = {
  variant: 'white',
  closable: false,
  autoclose: true,
  timeout: 4000,
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toastComponentFactory!: ComponentFactory<ToastComponent>;
  private _toastsContainerElement!: HTMLElement;
  private _toastsCount = 0;

  public constructor(
    private _overlay: Overlay,
    private _applicationRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {
    // Create component factory resolver for toast component
    this._toastComponentFactory =
      this._componentFactoryResolver.resolveComponentFactory(ToastComponent);
    this._initToastsContainer();
  }

  public open(toastConfig: ToastConfig): void {
    const toastComponentRef = this._createToast(toastConfig);
    const toastComponentInstance = toastComponentRef.instance;

    if (toastComponentInstance.autoclose) {
      setTimeout(() => {
        this._removeToast(toastComponentRef);
      }, toastComponentInstance.timeout);
    }
  }

  public getToastCount(): number {
    return this._toastsCount;
  }

  private _createToast(toastConfig: ToastConfig): ComponentRef<ToastComponent> {
    // Create toast component from factory
    const toastComponentRef = this._toastComponentFactory.create(
      this._injector
    );

    const toastComponentInstance = toastComponentRef.instance;

    // Config toast content and styles
    Object.assign(toastComponentInstance, {
      ...defaultToastConfig,
      ...toastConfig,
    });

    // Attach toast component to toasts container
    this._toastsContainerElement.appendChild(
      toastComponentRef.location.nativeElement
    );

    // Attach toast component to Angular component tree
    this._applicationRef.attachView(toastComponentRef.hostView);

    // Increment toast count
    this._toastsCount++;

    return toastComponentRef;
  }

  private _removeToast(toastComponentRef: ComponentRef<ToastComponent>): void {
    this._applicationRef.detachView(toastComponentRef.hostView);
    toastComponentRef.destroy();
    this._toastsCount--;
  }

  private _initToastsContainer(): void {
    const overlayConfig: OverlayConfig = {
      width: '100vw',
      height: '100vh',
      panelClass: 'toasts-container',
      positionStrategy: this._overlay
        .position()
        .global()
        .top('0')
        .left('0')
        .bottom('0')
        .right('0'),
    };

    const componentPortal = new ComponentPortal(ToastsContainerComponent);
    const overlayRef = this._overlay.create(overlayConfig);
    const componentRef = overlayRef.attach(componentPortal);

    this._toastsContainerElement = componentRef.location.nativeElement;
  }
}
