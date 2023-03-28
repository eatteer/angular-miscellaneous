import { Component, Host, Input, OnInit } from '@angular/core';
import { FormErrorContainerComponent } from '../form-error-container/form-error-container.component';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-error',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.css'],
})
export class FormErrorMessageComponent implements OnInit {
  @Input()
  public error!: string;

  public control!: AbstractControl;

  public constructor(
    @Host() private formErrorContainer: FormErrorContainerComponent
  ) {}

  public ngOnInit(): void {
    this.control = this.formErrorContainer.control;
  }
}
