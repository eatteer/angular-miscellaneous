import { TestBed } from '@angular/core/testing';

import { InfiniteAnimeService } from './infinite-anime.service';

describe('InfiniteAnimeService', () => {
  let service: InfiniteAnimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteAnimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
