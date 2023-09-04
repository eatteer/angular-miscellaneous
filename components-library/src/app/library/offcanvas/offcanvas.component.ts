import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type OffcanvasDirection = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffcanvasComponent {
  @Input()
  public direction: OffcanvasDirection = 'left';

  @Input()
  public isOpen: boolean = false;

  @Output()
  public isOpenChange: EventEmitter<boolean> = new EventEmitter();

  public openOffcanvas(): void {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

  public closeOffcanvas(): void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  public getDynamicClassesForCanvas(): Record<string, boolean> {
    return {
      'offcanvas-left': this.direction === 'left',
      'offcanvas-right': this.direction === 'right',
      'offcanvas-top': this.direction === 'top',
      'offcanvas-bottom': this.direction === 'bottom',
      'offcanvas-open': this.isOpen,
    };
  }

  public getDynamicClasesForOverlay(): Record<string, boolean> {
    return {
      'offcanvas-overlay-open': this.isOpen,
    };
  }
}
