import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteAnimeComponent } from './infinite-anime.component';

describe('InfiniteAnimeComponent', () => {
  let component: InfiniteAnimeComponent;
  let fixture: ComponentFixture<InfiniteAnimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteAnimeComponent]
    });
    fixture = TestBed.createComponent(InfiniteAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
