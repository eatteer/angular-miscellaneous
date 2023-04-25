import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public ColumnMode = ColumnMode;

  public users: User[] = [];

  public columns = [
    { name: 'Name', prop: 'name' },
    { name: 'Username', prop: 'username' },
    { name: 'Email', prop: 'email' },
    { name: 'City', prop: 'address.city' },
  ];

  public sorts = [{ prop: 'name', dir: 'asc' }];

  public constructor(private _httpClient: HttpClient) {}

  public ngOnInit(): void {
    this._fetchUsers();
  }

  private _fetchUsers(): void {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
    this._httpClient
      .get<User[]>(endpoint)
      .subscribe((users) => (this.users = users));
  }

  public onSort(event: any): void {
    console.log(event);
  }
}
