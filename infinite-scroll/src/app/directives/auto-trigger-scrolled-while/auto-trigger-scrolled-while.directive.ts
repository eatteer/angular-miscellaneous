import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Directive({
  selector: '[autoTriggerScrolledWhile]',
})
export class AutoTriggerScrolledWhileDirective implements OnInit, OnDestroy {
  @Input()
  public autoTriggerScrolledWhile: boolean = true;

  public element!: HTMLElement;
  public elementClientRect!: DOMRect;
  public mutationObserver!: MutationObserver;

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly infiniteScrollDirective: InfiniteScrollDirective
  ) {}

  public ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    this.observeElementMutations();
  }

  public observeElementMutations(): void {
    const mutationObserverConfig: MutationObserverInit = {
      childList: true,
    };

    this.mutationObserver = new MutationObserver((mutationsList, observer) => {
      this.elementClientRect =
        this.elementRef.nativeElement.getBoundingClientRect();

      const distanceToWindowBottom =
        window.innerHeight - this.elementClientRect.bottom;

      if (distanceToWindowBottom >= 0 && this.autoTriggerScrolledWhile) {
        this.infiniteScrollDirective.scrolled.next({
          currentScrollPosition: 0,
        });
      } else {
        // Disconnect when a negative distance to window bottom is reached
        this.mutationObserver.disconnect();
      }
    });

    this.mutationObserver.observe(this.element, mutationObserverConfig);
  }

  public ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }
}
