import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoremComponent } from './lorem.component';

describe('LoremComponent', () => {
  let component: LoremComponent;
  let fixture: ComponentFixture<LoremComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoremComponent]
    });
    fixture = TestBed.createComponent(LoremComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
