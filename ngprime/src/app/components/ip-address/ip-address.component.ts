import { Component, Input } from '@angular/core';
import { User } from 'src/app/data';

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.scss'],
})
export class IpAddressComponent {
  @Input()
  public user!: User;
}
