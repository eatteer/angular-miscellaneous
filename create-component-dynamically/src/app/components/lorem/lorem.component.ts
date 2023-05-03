import { Component } from '@angular/core';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-lorem',
  templateUrl: './lorem.component.html',
  styleUrls: ['./lorem.component.scss'],
  providers: [FooService],
})
export class LoremComponent {
  public isAuthenticated: boolean = this._fooService.isAuthenticated;

  public constructor(private _fooService: FooService) {}
}
