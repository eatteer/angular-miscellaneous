import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  // public form = new FormGroup({
  //   name: new FormGroup({
  //     first: new FormControl('', [Validators.required]),
  //     last: new FormControl('', [Validators.required]),
  //   }),
  //   phones: new FormArray([
  //     new FormGroup({
  //       phone: new FormControl('', [Validators.required]),
  //       type: new FormControl('', [Validators.required]),
  //     }),
  //   ]),
  // });
  public typeList = [
    { displayName: 'Home', value: 'home' },
    { displayName: 'Mobile', value: 'mobile' },
    { displayName: 'Work', value: 'work' },
    { displayName: 'Other', value: 'other' },
  ];

  public tagList = [
    { displayName: 'Friend', value: 'friend' },
    { displayName: 'Coworker', value: 'coworker' },
    { displayName: 'Family', value: 'family' },
  ];

  public form = this.fb.group({
    name: this.fb.group({
      first: ['', [Validators.required, Validators.minLength(3)]],
      last: ['', [Validators.required]],
    }),
    phones: this.fb.array(
      [
        this.fb.group({
          phone: ['', [Validators.required]],
          type: ['', [Validators.required]],
        }),
      ],
      [Validators.required]
    ),
    tags: [[], [Validators.required]],
  });

  public constructor(private fb: FormBuilder) {}

  public get name() {
    return this.form.controls.name;
  }

  public get phones() {
    return this.form.controls.phones;
  }

  public get tags() {
    return this.form.controls.tags;
  }

  public addPhone(): void {
    const group = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
    this.phones.push(group);
  }

  public removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  public logForm(): void {
    console.log(this.form);
  }
}
