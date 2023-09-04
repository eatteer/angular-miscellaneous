import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tailwind-themes-scss';

  public constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    initFlowbite();
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
