import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { StepComponent } from '../step/step.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements AfterContentInit {
  @Input()
  public initialStepIndex = 0;

  @ContentChildren(StepComponent)
  public stepComponents!: QueryList<StepComponent>;

  public firstStepIndex: number = 0;
  public lastStepIndex: number = 0;
  public activeStepIndex: number = 0;

  public stepsNumbers: number[] = [];

  @Output()
  public onSelectStep: EventEmitter<number> = new EventEmitter();

  @Output()
  public onPreviousStep: EventEmitter<void> = new EventEmitter();

  @Output()
  public onNextStep: EventEmitter<void> = new EventEmitter();

  @Output()
  public onFinish: EventEmitter<void> = new EventEmitter();

  public ngAfterContentInit(): void {
    this.generateStepsNumbers();
    this.stepComponents.get(this.initialStepIndex)!.active = true;
    this.lastStepIndex = this.stepComponents.length - 1;
    this.activeStepIndex = this.initialStepIndex;
  }

  /**
   *  Activate a step given its index while deactivate the rest and emit `onSelectStep` event.
   *
   * @param {number} stepIndex Index of step to activate
   */
  public selectStep(stepIndex: number): void {
    this.activeStepIndex = stepIndex;
    this.stepComponents.forEach((step, currentIndex) => {
      step.active = currentIndex === stepIndex ? true : false;
    });
    this.onSelectStep.emit(stepIndex);
  }

  /**
   * Decrement `activeStepIndex`, run `selectStep` and emit `onPreviousStep` event.
   */
  public previousStep(): void {
    this.activeStepIndex--;
    this.selectStep(this.activeStepIndex);
    this.onPreviousStep.emit();
  }

  /**
   * Increment `activeStepIndex`, run `selectStep` and emit `onNextStep` event.
   */
  public nextStep(): void {
    this.activeStepIndex++;
    this.selectStep(this.activeStepIndex);
    this.onNextStep.emit();
  }

  /**
   * Emit `onFinish` event.
   */
  public finish(): void {
    this.onFinish.emit();
  }

  /**
   * Generate an array containing the steps numbers.
   */
  private generateStepsNumbers(): void {
    const { length } = this.stepComponents;
    this.stepsNumbers = Array.from({ length }, (_, i) => i + 1);
  }
}
