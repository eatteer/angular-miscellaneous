import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public options: any[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  public selectedOption: any = this.options.at(0);

  public isOffcanvasOpen: boolean = false;

  public text: FormControl<string> = new FormControl('', { nonNullable: true });

  public toggleOffcanvas(): void {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  public control = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);
}
