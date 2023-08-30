import { TestBed } from '@angular/core/testing';

import { IpsumService } from './ipsum.service';

describe('IpsumService', () => {
  let service: IpsumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpsumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
