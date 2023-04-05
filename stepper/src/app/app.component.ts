import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public onSelectStep(selectedStepIndex: number): void {
    console.log('any');
  }

  public onPreviousStep(): void {
    console.log('previous');
  }
  public onNextStep(): void {
    console.log('next');
  }
  public onFinish(): void {
    console.log('finish');
  }
}
