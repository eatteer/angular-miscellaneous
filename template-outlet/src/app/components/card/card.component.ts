import { Component, Input, TemplateRef } from '@angular/core';

export interface Property {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  navigate: Function;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  public headerTemplate?: TemplateRef<Property>;

  @Input()
  public bodyTemplate?: TemplateRef<Property>;

  @Input()
  public footerTemplate?: TemplateRef<Property>;

  public property: Property = {
    image: {
      src: 'https://ap.rdcpix.com/b04813efec14581ba5b5f2080544a7b6l-m1346987465od-w480_h360_x2.jpg',
      alt: 'Central Park Tower',
    },
    title: 'Central Park Tower',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias numquam rem ex cupiditate incidunt exercitationem ullam temporibus quas totam excepturi nesciunt vero quam rerum, voluptatibus tempore officiis nam dicta ipsam.`,
    navigate: this.navigate,
  };

  public navigate(): void {
    alert('Navigate to details');
  }
}
