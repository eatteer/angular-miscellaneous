import { Component } from '@angular/core';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-lorem',
  templateUrl: './lorem.component.html',
  styleUrls: ['./lorem.component.scss'],
  providers: [FooService],
})
export class LoremComponent {
  public constructor(public fooService: FooService) {}

  public get message(): string {
    return this.fooService.message;
  }
}
