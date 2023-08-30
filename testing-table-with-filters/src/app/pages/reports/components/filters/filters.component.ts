import { Component } from '@angular/core';
import { FiltersService } from './services/filters/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  public constructor(public readonly filtersService: FiltersService) {}
}
