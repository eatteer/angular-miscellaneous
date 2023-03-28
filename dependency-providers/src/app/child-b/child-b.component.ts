import { Component } from '@angular/core';
import { DummyAService } from '../dummy-a.service';

@Component({
  selector: 'app-child-b',
  templateUrl: './child-b.component.html',
  styleUrls: ['./child-b.component.css'],
})
export class ChildBComponent {
  public constructor(private dummyAService: DummyAService) {
    (<any>window).cbc = this.dummyAService;
  }
}
