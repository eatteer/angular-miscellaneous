import { Component, Input } from '@angular/core';
import { Photo } from 'src/app/types/photo.interface';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css'],
})
export class PhotosListComponent {
  @Input()
  public photos: Photo[] = [];
}
