import { createAction, props } from '@ngrx/store';
import { Todo } from '../entities/todo.entity';

export const loadSuccess = createAction(
  '[Todos API] Load Success',
  props<{ todos: Todo[] }>()
);

export const loadError = createAction(
  '[Todos API] Load Error',
  props<{ message: string }>()
);

export const addSuccess = createAction(
  '[Todos API] Add Success',
  props<{ todo: Todo }>()
);

export const addError = createAction(
  '[Todos API] Add Error',
  props<{ message: string }>()
);

export const removeSuccess = createAction(
  '[Todos API] Remove Success',
  props<{ todo: Todo }>()
);

export const removeError = createAction(
  '[Todos API] Remove Error',
  props<{ message: string }>()
);

export const markAsCompletedSuccess = createAction(
  '[Todos API] Mark as Completed Success',
  props<{ todo: Todo }>()
);

export const markAsCompletedError = createAction(
  '[Todos API] Mark as Completed Error',
  props<{ message: string }>()
);

export const markAsPendingSuccess = createAction(
  '[Todos API] Mark as Pending Success',
  props<{ todo: Todo }>()
);

export const markAsPendingError = createAction(
  '[Todos API] Mark as Pending Error',
  props<{ message: string }>()
);

export const clearCompletedSuccess = createAction(
  '[Todos API] Clear Completed Success'
);

export const clearCompletedError = createAction(
  '[Todos API] Clear Completed Error',
  props<{ message: string }>()
);
