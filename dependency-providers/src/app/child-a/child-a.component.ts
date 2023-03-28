import { Component } from '@angular/core';
import { DummyAService } from '../dummy-a.service';

@Component({
  selector: 'app-child-a',
  templateUrl: './child-a.component.html',
  styleUrls: ['./child-a.component.css'],
})
export class ChildAComponent {
  public constructor(private dummyAService: DummyAService) {
    (<any>window).cac = this.dummyAService;
  }
}
