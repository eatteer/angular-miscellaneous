import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  public areActionsDisabled: boolean = false;
  public response: boolean | null = null;

  public answer(response: boolean): void {
    this.response = response;
  }
}
