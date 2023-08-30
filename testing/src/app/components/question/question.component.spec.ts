import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionComponent } from './question.component';
import { By } from '@angular/platform-browser';

describe('QuestionComponent', () => {
  let fixture: ComponentFixture<QuestionComponent>;
  let component: QuestionComponent;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [QuestionComponent],
    });
    testBed.compileComponents();
    fixture = testBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header title of "Question"', () => {
    const header = fixture.debugElement.query(By.css('header'))
      .nativeElement as HTMLElement;
    expect(header.textContent).toBe('Question');
  });

  it('should have a response of true', () => {
    component.answer(true);
    expect(component.response).toBe(true);
  });
});
