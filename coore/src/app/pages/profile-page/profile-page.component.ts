import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  public constructor() {
    console.log('ProfilePageComponent.constructor');
  }

  public ngOnInit(): void {
    console.log('ProfilePageComponent.ngOnInit');
  }
}
