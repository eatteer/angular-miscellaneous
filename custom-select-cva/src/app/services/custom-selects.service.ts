import { Injectable } from '@angular/core';
import { CustomSelectComponent } from '../components/custom-select/custom-select.component';

@Injectable({
  providedIn: 'root',
})
export class CustomSelectsService {
  public customSelects: CustomSelectComponent[] = [];

  public constructor() {}

  public register(customSelect: CustomSelectComponent): void {
    this.customSelects.push(customSelect);
  }

  public remove(customSelect: CustomSelectComponent): void {
    const index = this.customSelects.findIndex((currentCustomSelect) => {
      currentCustomSelect === customSelect;
    });
    this.customSelects.splice(index, 1);
  }

  public closeAllExcept(customSelect: CustomSelectComponent) {
    this.customSelects.forEach((currentCustomSelect) => {
      if (currentCustomSelect !== customSelect) {
        currentCustomSelect.show = false;
      }
    });
  }
}
