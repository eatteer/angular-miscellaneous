import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  GetGithubUserDto,
  GithubUser,
} from '../../types/github-user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GithubUserService {
  public readonly GITHUB_USER_ENDPOINT = 'https://api.github.com/users';

  public constructor(private httpClient: HttpClient) {}

  public getUser(username: string): Observable<GithubUser> {
    return this.httpClient
      .get<GetGithubUserDto>(`${this.GITHUB_USER_ENDPOINT}/${username}`)
      .pipe(map((getGithubUserDto) => this.mapToGithubUser(getGithubUserDto)));
  }

  private mapToGithubUser(getGithubUserDto: GetGithubUserDto): GithubUser {
    const { login, avatar_url, location, followers } = getGithubUserDto;
    return {
      login,
      photo: avatar_url,
      location,
      followers,
    };
  }
}
