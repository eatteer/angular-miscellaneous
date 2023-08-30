import { Component } from '@angular/core';
import { IpsumService } from '../services/ipsum/ipsum.service';

@Component({
  selector: 'app-lorem',
  templateUrl: './lorem.component.html',
  styleUrls: ['./lorem.component.css'],
})
export class LoremComponent {
  public constructor(private readonly ipsumService: IpsumService) {
    console.log(`LoremComponent: ${this.ipsumService.id}`);
  }
}
