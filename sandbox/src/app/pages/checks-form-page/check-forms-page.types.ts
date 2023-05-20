import { FormGroup } from '@angular/forms';
import { GroupsControls } from '../components/checks-form/check-form.types';

export type Controls = {
  checks: FormGroup<GroupsControls>;
};
