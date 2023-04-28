import { Component } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

type TParamVarFormGroup = FormGroup<{
  key: FormControl<string | null>;
  alias: FormControl<string | null>;
}>;

type TPostbackVarFormGroup = FormGroup<{
  key: FormControl<string | null>;
  value: FormControl<string | null>;
}>;

type TPostbackVarFormArray = FormArray<TPostbackVarFormGroup>;
type TParamVarFormArray = FormArray<TParamVarFormGroup>;

interface IForm {
  postbackVars: TPostbackVarFormArray;
  paramVars: TParamVarFormArray;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public form: FormGroup<IForm> = this._fb.group({
    paramVars: this._fb.array([
      this._fb.group({
        key: ['', [Validators.required]],
        alias: ['', [Validators.required]],
      }),
    ]),
    postbackVars: this._fb.array([
      this._fb.group({
        key: ['', [Validators.required]],
        value: ['', [Validators.required]],
      }),
    ]),
  });

  public constructor(private _fb: FormBuilder) {}

  public get paramVarFormArray(): TParamVarFormArray {
    return this.form.controls.paramVars;
  }

  public get postbackVarFormArray(): TPostbackVarFormArray {
    return this.form.controls.postbackVars;
  }

  public get paramsVarFormArrayLength(): number {
    return this.paramVarFormArray.length;
  }

  public get postbackVarFormArrayLength(): number {
    return this.postbackVarFormArray.length;
  }

  public getParamVarFormGroup(formGroupIndex: number): TParamVarFormGroup {
    return this.paramVarFormArray.controls[formGroupIndex];
  }

  public getPostbackVarFormGroup(
    formGroupIndex: number
  ): TPostbackVarFormGroup {
    return this.postbackVarFormArray.controls[formGroupIndex];
  }

  public addParamVarFormGroup(): void {
    const paramVarFromGroup = this._fb.group({
      key: ['', [Validators.required]],
      alias: ['', [Validators.required]],
    });
    this.paramVarFormArray.push(paramVarFromGroup);
  }

  public removeParamVarFromGroup(index: number): void {
    this.paramVarFormArray.removeAt(index);
  }

  public addPostbackVarFormGroup(): void {
    const postbackVarFromGroup = this._fb.group({
      key: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });
    this.postbackVarFormArray.push(postbackVarFromGroup);
  }

  public removePostbackVarFromGroup(index: number): void {
    this.postbackVarFormArray.removeAt(index);
  }
}
