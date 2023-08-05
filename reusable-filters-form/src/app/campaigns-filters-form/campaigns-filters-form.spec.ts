import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CampaignsFiltersFormComponent } from './campaigns-filters-form.component';
import { CampaingsFilters } from './types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

describe('CampaignsFiltersFormComponent', () => {
  const initialFilters: CampaingsFilters = {
    campaign: 'Lorem',
    temperature: '',
    country: 'Ipsum',
    revenue: '',
    status: '',
  };

  let fixture: ComponentFixture<CampaignsFiltersFormComponent>;
  let component: CampaignsFiltersFormComponent;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [CampaignsFiltersFormComponent],
      imports: [ReactiveFormsModule],
      providers: [NgbActiveModal],
    });

    fixture = testBed.createComponent(CampaignsFiltersFormComponent);
    component = fixture.componentInstance;

    // @Input() initialFilters
    component.initialFilters = initialFilters;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial filters be cleaned as applied filters', () => {
    expect(component.appliedFilters).toEqual({
      campaign: 'Lorem',
      country: 'Ipsum',
    });
  });

  it('should clean applied filters on clear filters', () => {
    component.clearFilters();
    expect(component.appliedFilters).toEqual({});
  });
});
