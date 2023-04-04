import {
  Component,
  AfterContentInit,
  ContentChildren,
  QueryList,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';

@Component({
  selector: 'app-group-custom-select',
  templateUrl: './group-custom-select.component.html',
  styleUrls: ['./group-custom-select.component.css'],
})
export class GroupCustomSelectComponent implements AfterContentInit {
  @ContentChildren(CustomSelectComponent, { read: ElementRef<HTMLElement> })
  customSelects!: QueryList<ElementRef<HTMLElement>>;

  public constructor(private renderer2: Renderer2) {}

  /* For displaying grouped elements using Rendered2 */
  public ngAfterContentInit(): void {
    // this.customSelects.forEach((customSelect, index) => {
    //   const element = customSelect.nativeElement;
    //   const placeholder = element.querySelector('.placeholder');
    //   if (index === 0) {
    //     this.renderer2.addClass(placeholder, 'first');
    //     return;
    //   }
    //   if (index === this.customSelects.length - 1) {
    //     this.renderer2.addClass(placeholder, 'last');
    //     return;
    //   }
    //   this.renderer2.addClass(placeholder, 'middle');
    // });
  }
}
