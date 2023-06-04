import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import {
  Continent,
  ContinentValue,
} from './components/continent-selector/continent-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public customContinents: Continent[] = [
    {
      displayName: 'All',
      imageUrl: 'assets/south-america.png',
      value: '',
    },
    {
      displayName: 'Asia',
      imageUrl: 'assets/south-america.png',
      value: 'asia',
    },
    {
      displayName: 'Africa',
      imageUrl: 'assets/south-america.png',
      value: 'africa',
    },
  ];

  public form: FormGroup<{
    continent: FormControl<ContinentValue>;
  }> = this.fb.group({ continent: [''] });

  public constructor(private fb: NonNullableFormBuilder) {}

  public resetForm(): void {
    this.form.reset();
  }

  public selectAsia(): void {
    this.form.controls.continent.setValue('asia');
  }
}
