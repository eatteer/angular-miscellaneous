import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public totalItems = 500;
  public itemsPerPage = 15;
  public currentPage = 1;
  public items: any[] = [];

  public constructor(private httpClient: HttpClient) {}

  public ngOnInit(): void {
    this.fetchItems(this.currentPage).subscribe((items) => {
      this.items = items;
    });
  }

  public fetchItemsForPage(page: number): void {
    this.fetchItems(page).subscribe((items) => {
      this.items = items;
    });
  }

  private fetchItems(page: number): Observable<any[]> {
    const endpoint = `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${this.itemsPerPage}`;
    return this.httpClient.get<any[]>(endpoint);
  }
}
