import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clear-trigger',
  templateUrl: './clear-trigger.component.html',
  styleUrls: ['./clear-trigger.component.scss'],
})
export class ClearTriggerComponent {
  @ViewChild('trigger', { static: true, read: ElementRef<HTMLButtonElement> })
  public buttonRef!: ElementRef<HTMLButtonElement>;
}
