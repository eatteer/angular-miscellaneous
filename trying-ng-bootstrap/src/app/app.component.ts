import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('modal', { read: TemplateRef })
  public modalRef!: TemplateRef<any>;

  public step: number = 1;

  public constructor(private _modalService: NgbModal) {}

  public open(): void {
    this._modalService.open(this.modalRef, { centered: true });
  }

  public nextStep(): void {
    this.step++;
  }

  public previousStep(): void {
    this.step--;
  }
}
