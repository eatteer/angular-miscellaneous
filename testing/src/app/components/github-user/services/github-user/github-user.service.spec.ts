import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { GithubUserService } from './github-user.service';

import { githubUserMock, getGithubUserDtoMock } from './mocks';

describe('GithubUserService', () => {
  let service: GithubUserService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(GithubUserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a GithubUser', () => {
    service.getUser('eatteer').subscribe((githubUser) => {
      expect(githubUser).toEqual(githubUserMock);
    });

    const request = httpController.expectOne(
      `${service.GITHUB_USER_ENDPOINT}/eatteer`
    );

    // Resolve the request with the mock
    request.flush(getGithubUserDtoMock);
  });
});
