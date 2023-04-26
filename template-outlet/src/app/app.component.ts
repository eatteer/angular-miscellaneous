import { Component, ViewChild } from '@angular/core';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(CardComponent)
  public cardComponent!: CardComponent;
}
