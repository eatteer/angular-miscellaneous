import { Component } from '@angular/core';
import { DummyAService } from '../dummy-a.service';

@Component({
  selector: 'app-parent-a',
  templateUrl: './parent-a.component.html',
  styleUrls: ['./parent-a.component.css'],
  providers: [DummyAService],
})
export class ParentAComponent {}
