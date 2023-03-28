import { Component } from '@angular/core';
import { DummyService } from '../dummy.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
  providers: [],
})
export class DummyComponent {
  public constructor(public dummyService: DummyService) {}
}
