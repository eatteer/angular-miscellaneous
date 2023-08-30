import { AfterViewInit, Component, OnInit } from '@angular/core';
import { data } from './data';
import { Column } from './column.type';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public users = data;

  public columns: Column[] = [
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'First name' },
    { field: 'lastName', header: 'Last name' },
    { field: 'email', header: 'Email' },
    { field: 'ipAddress', header: 'IP Address' },
  ];

  public constructor(private messageService: MessageService) {}

  public ngAfterViewInit(): void {
    this.showToast();
  }

  public showToast(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'This is a toast message',
    });
  }
}
