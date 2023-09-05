import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ClearTriggerComponent } from 'src/app/library/clear-trigger/clear-trigger.component';

@Directive({
  selector: '[appClearInputBy]',
})
export class ClearInputDirective implements OnInit {
  @Input('appClearInputBy')
  public clearTrigger!: ClearTriggerComponent;

  public constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private ngControl: NgControl
  ) {}

  public ngOnInit(): void {
    this.toggleClearIcon();
  }

  @HostListener('input')
  public onInput(): void {
    this.toggleClearIcon();
  }

  public ngAfterViewInit() {
    this.renderer2.listen(
      this.clearTrigger.buttonRef.nativeElement,
      'click',
      () => this.clearControl()
    );
  }

  public clearControl(): void {
    if (this.ngControl.control) this.ngControl.control.setValue('');
    this.toggleClearIcon();
  }

  private toggleClearIcon(): void {
    const showIcon = this.elementRef.nativeElement.value.length > 0;
    this.renderer2.setStyle(
      this.clearTrigger.buttonRef.nativeElement,
      'display',
      showIcon ? 'flex' : 'none'
    );
  }
}
