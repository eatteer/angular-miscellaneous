import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public constructor() {
    console.log('UserPageComponent.constructor');
  }

  public ngOnInit(): void {
    console.log('UserPageComponent.ngOnInit');
  }
}
