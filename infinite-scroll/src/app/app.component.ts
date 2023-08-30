import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('photosList')
  public photosListRef!: ElementRef<HTMLDivElement>;
  public photosList!: HTMLDivElement;

  private endpoint = 'https://jsonplaceholder.typicode.com/photos';

  private currentPage = 1;
  private photosPerPage = 0;

  public photos$ = new BehaviorSubject<Photo[]>([]);

  public constructor(private readonly httpClient: HttpClient) {}

  public ngAfterViewInit(): void {
    // document.addEventListener('scroll', () => {
    //   console.log('scroll');
    // });
    this.getPhotosFirstTime();
  }

  public onPhotosListBottomReached(): void {
    this.getPhotosSubsequentTimes();
  }

  public onScroll(): void {
    console.log('scroll');
  }

  private calculateHowManyItemsFitContainer(
    itemHeight: number,
    containerHeight: number
  ): number {
    return Math.ceil(containerHeight / itemHeight);
  }

  private calculatePhotosPerPageFirstTime(): number {
    this.photosList = this.photosListRef.nativeElement;

    const photosListClientRect = this.photosList.getBoundingClientRect();
    const photosListHeight = window.innerHeight - photosListClientRect.top;
    const photoCardHeight = 186;

    console.log(photosListClientRect);

    const photosPerPage = this.calculateHowManyItemsFitContainer(
      photoCardHeight,
      photosListHeight
    );

    const totalPhotosPerPage = photosPerPage + 2;
    return totalPhotosPerPage;
  }

  private getPhotosFirstTime(): void {
    this.photosPerPage = this.calculatePhotosPerPageFirstTime();

    const pagination = this.getPagination(
      this.currentPage++,
      this.photosPerPage
    );

    this.getPhotos(pagination).subscribe((photos) => {
      this.photos$.next(photos);
    });
  }

  private getPhotosSubsequentTimes(): void {
    const pagination = this.getPagination(
      this.currentPage++,
      this.photosPerPage
    );

    this.getPhotos(pagination).subscribe((photos) => {
      const previousPhotos = this.photos$.getValue();
      this.photos$.next([...previousPhotos, ...photos]);
    });
  }

  private getPhotos({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Observable<Photo[]> {
    const httpParams = new HttpParams()
      .set('_limit', limit)
      .set('_start', offset);

    return this.httpClient.get<Photo[]>(this.endpoint, { params: httpParams });
  }

  private getPagination(page: number, itemsPerPage: number) {
    // const offset =
    //   (page - 1) * itemsPerPage -
    //   (page === 1 ? 0 : this.photosPerPageFirstTime);

    // const offset = (page - 2) * itemsPerPage + this.photosPerPageFirstTime;

    const offset = (page - 1) * itemsPerPage;
    return { limit: itemsPerPage, offset };
  }
}
