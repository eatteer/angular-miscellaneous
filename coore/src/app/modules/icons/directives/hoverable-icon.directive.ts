import { Directive, HostListener, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular';

export type TransitionTo = 'outline' | 'filled' | 'sharp';

@Directive({
  selector: '[appHoverableIcon]',
})
export class HoverableIconDirective {
  private readonly _name!: string;

  @Input()
  public transitionTo: TransitionTo = 'filled';

  public constructor(private _icon: IonIcon) {
    this._name = this._icon.name!;
  }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    /**
     * Since the icon name can be as, for example:
     * heart (Filled), heart-outline (Outline) or heart-sharp (Sharp)
     *
     * To transition styles, for example, the most common
     * heart -> heart-outline. the algorithm to transition styles is the following:
     * 1. The icon is filled? Does not have: -outline or -sharp
     *  If true, conserve the name: 'heart'
     *  If not, remove the '-outline' and conserve the icon name: 'heart'
     * 2. The transition to is filled?
     *  If true, use the lonely name: 'heart'
     *  It not, use the lonely name plus the transition to style: 'heart-outline'
     */
    const start = 0;
    const end = this._name.indexOf('-');
    const isFilled = this._name.includes('-');
    const lonelyName = isFilled ? this._name.substring(start, end) : this._name;

    // Transition to
    if (this.transitionTo === 'filled') {
      this._icon.name = lonelyName;
    } else {
      const name = `${lonelyName}-${this.transitionTo}`;
      this._icon.name = name;
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this._icon.name = this._name;
  }
}
