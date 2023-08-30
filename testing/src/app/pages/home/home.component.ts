import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public needsLogin = true;

  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      this.needsLogin = !isAuthenticated;
    });
  }

  public log(): void {
    console.log('detect changes');
  }
}
