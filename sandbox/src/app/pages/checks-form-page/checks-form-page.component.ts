import { Component, OnInit, ViewChild } from '@angular/core';
import { ChecksFormComponent } from '../components/checks-form/checks-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controls } from './check-forms-page.types';

@Component({
  selector: 'app-checks-form-page',
  templateUrl: './checks-form-page.component.html',
  styleUrls: ['./checks-form-page.component.scss'],
})
export class ChecksFormPageComponent implements OnInit {
  @ViewChild(ChecksFormComponent, { static: true })
  public checksForm!: ChecksFormComponent;

  public form!: FormGroup<Controls>;

  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      checks: this.checksForm.createForm(),
    });
  }
}
