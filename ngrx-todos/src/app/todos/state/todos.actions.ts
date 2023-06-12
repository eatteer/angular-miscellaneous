import { createAction, props } from '@ngrx/store';
import { Todo } from '../entities/todo.entity';

export const init = createAction('[Todos] Init todos');

export const add = createAction('[Todos] Add', props<{ todo: Todo }>());

export const remove = createAction('[Todos] Remove', props<{ todo: Todo }>());

export const markAsCompleted = createAction(
  '[Todos] Mark as completed',
  props<{ todo: Todo }>()
);

export const markAsPending = createAction(
  '[Todos] Mark as pending',
  props<{ todo: Todo }>()
);

export const clearCompleted = createAction('[Todos] Clear completed');
