import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ToastsContainerComponent } from '../toasts-container/toasts-container.component';
import { ToastComponent } from './toast.component';
import { ToastConfig } from './toast.types';
import { ActiveToast } from './active-toast';

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
    // Create component factory for toast component
    this._toastComponentFactory =
      this._componentFactoryResolver.resolveComponentFactory(ToastComponent);
    this._initToastsContainer();
  }

  public open(toastConfig: ToastConfig): void {
    // Create toast component from factory
    const toastComponentRef = this._toastComponentFactory.create(
      this._injector
    );

    const toastComponentInstance = toastComponentRef.instance;
    const toastElement = toastComponentRef.location.nativeElement;

    // Configure pointer event behavior
    toastElement.style.pointerEvents = 'auto';

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
    this._incrementToastCount();

    if (toastComponentInstance.autoclose) {
      setTimeout(() => {
        this._removeToast(toastComponentRef);
      }, toastComponentInstance.timeout);
    }
  }

  public openWith<T>(component: Type<T>): void {
    const activeToast: ActiveToast = { close: () => {} };

    // Create component factory for given component
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(component);

    // Create injector for given component
    const componentInjector = Injector.create({
      parent: this._injector,
      providers: [{ provide: ActiveToast, useValue: activeToast }],
    });

    // Create component from factory
    const componentRef = componentFactory.create(componentInjector);
    const componentElement = componentRef.location.nativeElement as HTMLElement;

    // Configure pointer event behavior
    componentElement.style.pointerEvents = 'auto';

    // Configure ActiveToast
    activeToast.close = () => this._removeToast(componentRef);

    // Attach component to toasts container
    this._toastsContainerElement.appendChild(
      componentRef.location.nativeElement
    );

    // Attach component to Angular tree
    this._applicationRef.attachView(componentRef.hostView);

    // Increment toast count
    this._incrementToastCount();
  }

  public getToastCount(): number {
    return this._toastsCount;
  }

  private _incrementToastCount(): void {
    this._toastsCount++;
  }

  private _removeToast<T>(
    toastComponentRef: ComponentRef<ToastComponent | T>
  ): void {
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
