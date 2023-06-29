import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { EditableUser } from 'src/app/app.component';

export interface EmailRendererParams extends ICellRendererParams<EditableUser> {
  controlName: string;
}

@Component({
  selector: 'app-email-renderer',
  templateUrl: './email-renderer.component.html',
  styleUrls: ['./email-renderer.component.css'],
})
export class EmailRendererComponent implements ICellRendererAngularComp {
  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  public params!: EmailRendererParams;
  public group!: FormGroup<any>;
  public control!: FormControl<any>;

  public agInit(params: EmailRendererParams): void {
    this.params = params;
    this.group = params.data!.group;
    this.control = this.group.get(params.controlName)! as FormControl;
  }

  public refresh(params: EmailRendererParams): boolean {
    return true;
  }

  public setDefaultValue(): void {
    this.control.setValue(this.params.data!.email);
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
