import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ipsum',
  templateUrl: './ipsum.component.html',
  styleUrls: ['./ipsum.component.css'],
})
export class IpsumComponent {
  @Input()
  public index = 0;
}
