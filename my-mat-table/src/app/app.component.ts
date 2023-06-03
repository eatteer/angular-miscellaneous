import { Component } from '@angular/core';
import { TableColumns, Photo } from './types';
import { PHOTOS } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public photos: Photo[] = PHOTOS;

  public columnsToDisplay: Array<TableColumns> = [
    'actions',
    'albumId',
    'id',
    'title',
    'url',
    'thumbnailUrl',
  ];

  public edit(photo: Photo): void {
    alert(photo.id);
  }
}
