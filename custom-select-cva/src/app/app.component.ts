import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public form = this.fb.group({ where: null, fwhere2: null });

  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((_) => {
      console.log(this.form.value);
    });
  }
}
