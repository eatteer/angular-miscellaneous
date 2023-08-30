import { Injectable } from '@angular/core';
import { Group } from '../../types/group.interface';
import { GROUPS } from '../../constants/groups.constant';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public GROUPS = GROUPS;
  public checkedGroups: Group[] = [];
}
