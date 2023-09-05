import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearTriggerComponent } from './clear-trigger.component';

describe('ClearTriggerComponent', () => {
  let component: ClearTriggerComponent;
  let fixture: ComponentFixture<ClearTriggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClearTriggerComponent]
    });
    fixture = TestBed.createComponent(ClearTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
