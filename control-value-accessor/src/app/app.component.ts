import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public form = this.fb.group({ counter: [10, [Validators.min(5)]] });

  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    // this.counter.valueChanges.subscribe(console.log);
    this.counter.statusChanges.subscribe((status) => {
      if (status === 'INVALID') {
        if (this.counter.hasError('min')) {
          alert('Error: min validation');
        }
      }
    });
  }

  public get counter() {
    return this.form.controls.counter;
  }
}
