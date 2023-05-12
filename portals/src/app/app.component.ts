import { Component, AfterViewInit } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoremComponent } from './components/lorem/lorem.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public lorem!: ComponentPortal<LoremComponent>;
  public ngAfterViewInit(): void {}
}
