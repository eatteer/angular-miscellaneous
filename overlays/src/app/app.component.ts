import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public periods = [
    { name: 'Select a period', value: '' },
    { name: 'Current month', value: 'currentMonth' },
    { name: 'Today', value: 'today' },
    { name: 'Yesterday', value: 'yesterday' },
  ];

  public form = this._fb.group({ period: ['currentMonth'] });

  public constructor(private _fb: NonNullableFormBuilder) {}
}
