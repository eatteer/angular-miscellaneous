import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IpsumComponent } from '../ipsum/ipsum.component';

@Component({
  selector: 'app-lorem',
  templateUrl: './lorem.component.html',
  styleUrls: ['./lorem.component.css'],
})
export class LoremComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('containerForIpsum', { read: ViewContainerRef })
  public containerForIpsum!: ViewContainerRef;

  @ViewChild('containerForTemplate', { read: ViewContainerRef })
  public containerForTemplate!: ViewContainerRef;

  @ViewChild('template', { read: TemplateRef })
  public template!: TemplateRef<any>;

  public username = 'Gayrid';

  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) {}

  public ngOnInit(): void {}

  // The view was already rendered
  public ngAfterViewInit(): void {
    this.username = 'Debviluke';
    // this.createViews();
    // this.changeDetectorRef.detectChanges();
  }

  public ngAfterViewChecked(): void {}

  public createViews(): void {
    for (let i = 0; i < 3; i++) {
      const componentRef =
        this.containerForIpsum.createComponent(IpsumComponent);
      componentRef.setInput('index', i);
      this.containerForTemplate.createEmbeddedView(this.template);
    }
  }
}
