import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(private _authService: AuthService) {
    // Config auth
    this._authService.isAuthenticated = true;
    this._authService.isPrime = false;

    console.log('AppComponent.constructor');
  }

  public ngOnInit(): void {
    console.log('AppComponent.ngOnInit');
  }
}
