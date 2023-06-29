import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AppComponent, User } from 'src/app/app.component';

export interface ActionsRendererParams extends ICellRendererParams<User> {}

@Component({
  selector: 'app-actions-renderer',
  templateUrl: './actions-renderer.component.html',
  styleUrls: ['./actions-renderer.component.css'],
})
export class ActionsRendererComponent implements ICellRendererAngularComp {
  public user!: User;

  public constructor(private appComponent: AppComponent) {}

  public agInit(params: ActionsRendererParams): void {
    this.user = params.data!;
  }

  public refresh(params: ActionsRendererParams): boolean {
    return true;
  }

  public addUserForEditing(): void {
    this.appComponent.addUserForEditing(this.user);
  }
}
