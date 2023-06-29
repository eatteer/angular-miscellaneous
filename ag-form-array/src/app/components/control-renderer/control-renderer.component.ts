import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { EditableUser } from 'src/app/app.component';

export interface ControlRendererParams
  extends ICellRendererParams<EditableUser> {
  controlName: string;
}

@Component({
  selector: 'app-control-renderer',
  templateUrl: './control-renderer.component.html',
  styleUrls: ['./control-renderer.component.css'],
})
export default class ControlRendererComponent
  implements ICellRendererAngularComp
{
  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  public params!: ControlRendererParams;
  public group!: FormGroup<any>;
  public control!: FormControl<any>;

  public constructor(private elementRef: ElementRef<HTMLElement>) {}

  public onKeyDownRenderer(): void {
    alert('enter');
  }

  public agInit(params: ControlRendererParams): void {
    this.params = params;
    this.group = params.data!.group;
    this.control = this.group.get(params.controlName)! as FormControl;
  }

  public refresh(params: ControlRendererParams): boolean {
    return true;
  }

  public onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === 'Escape') {
      this.unfocusInput();
      this.params.api.setFocusedCell(
        this.params.rowIndex,
        this.params.column!.getColId()
      );
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      // Prevent grid navigation when navigating within the input field
      event.stopPropagation();
      return;
    }

    const isCtrlPressed = event.ctrlKey || event.metaKey; // Check if Ctrl (or Command) key is pressed
    if (isCtrlPressed && key === 'a') {
      this.selectInputText();
      event.preventDefault(); // Prevent the default select-all behavior of the browser
      return;
    }
  }

  private focusInput(): void {
    this.input.nativeElement.focus();
  }

  private unfocusInput(): void {
    this.input.nativeElement.blur();
  }

  private selectInputText(): void {
    this.input.nativeElement.select();
  }
}
