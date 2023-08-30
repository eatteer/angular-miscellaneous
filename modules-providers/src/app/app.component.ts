import { Component } from '@angular/core';
import { IpsumService } from './services/ipsum/ipsum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'modules-providers';

  public constructor(private readonly ipsumService: IpsumService) {
    console.log(`AppComponent: ${this.ipsumService.id}`);
  }
}
