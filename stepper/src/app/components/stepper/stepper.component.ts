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

  @Output()
  public onSelectStep: EventEmitter<number> = new EventEmitter();

  @Output()
  public onPreviousStep: EventEmitter<void> = new EventEmitter();

  @Output()
  public onNextStep: EventEmitter<void> = new EventEmitter();

  @Output()
  public onFinish: EventEmitter<void> = new EventEmitter();

  @ContentChildren(StepComponent)
  public steps!: QueryList<StepComponent>;

  public firstStepIndex: number = 0;
  public lastStepIndex: number = 0;
  public activeStepIndex: number = 0;

  public activeStep!: StepComponent;

  public ngAfterContentInit(): void {
    this.lastStepIndex = this.steps.length - 1;

    // Init active step
    const step = this.steps.get(this.initialStepIndex)!;
    this.activeStep = step;
    this.activeStepIndex = this.initialStepIndex;
    step.active = true;
  }

  /**
   *  Activate a step given its index while deactivate the rest.
   *
   * @param {number} stepIndex Index of step to activate
   */
  public selectStep(stepIndex: number): void {
    const step = this.steps.get(stepIndex)!;
    this.activeStepIndex = stepIndex;
    this.activeStep = step;

    // Deactivate steps except the selected one.
    this.steps.forEach((step, currentIndex) => {
      step.active = currentIndex === stepIndex ? true : false;
    });
  }

  public anyStep(stepIndex: number): void {
    const indexOfStepThatAvoids = this.steps
      .toArray()
      .findIndex((stepComponent) => !stepComponent.allowNextWhen);

    // If there are some steps that avoid navigation and
    // user is trying to navigate forward, then navigate
    // to this first found step that avoids forward navigation.
    if (indexOfStepThatAvoids > 1 && stepIndex > indexOfStepThatAvoids) {
      this.selectStep(indexOfStepThatAvoids);
      return;
    }

    this.selectStep(stepIndex);
    this.onSelectStep.emit(stepIndex);
  }

  /**
   * Decrement `activeStepIndex`, run `selectStep` and emit `onPreviousStep` event.
   */
  public previousStep(): void {
    this.selectStep(--this.activeStepIndex);
    this.onPreviousStep.emit();
  }

  /**
   * Increment `activeStepIndex`, run `selectStep` and emit `onNextStep` event.
   */
  public nextStep(): void {
    if (!this.activeStep.allowNextWhen) return;
    this.selectStep(++this.activeStepIndex);
    this.onNextStep.emit();
  }

  /**
   * Emit `onFinish` event.
   */
  public finish(): void {
    this.onFinish.emit();
  }

  public toggleAllowNext(stepIndex: number): void {
    const step = this.steps.get(stepIndex)!;
    step.allowNextWhen = !step.allowNextWhen;
  }
}
