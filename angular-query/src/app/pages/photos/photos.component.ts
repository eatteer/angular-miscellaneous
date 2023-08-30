import { Component } from '@angular/core';
import { PhotosService } from 'src/app/services/photos/photos.service';
import { Photo } from 'src/app/types/photo.interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent {
  public photos$ = this.photosService.getPhotos().result$;
  public addTodo = this.photosService.addPhoto();

  public constructor(private photosService: PhotosService) {}

  public addPhoto(): void {
    const photo: Photo = {
      albumId: 999,
      id: 999,
      title: 'Test',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    };

    this.addTodo.mutate(photo);
  }
}
