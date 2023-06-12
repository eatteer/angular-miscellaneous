import { createAction, props } from '@ngrx/store';
import { Todo } from '../entities/todo.entity';

export const initTodos = createAction('[Todos] Init');

export const addTodo = createAction('[Todos] Add', props<{ todo: Todo }>());

export const removeTodo = createAction(
  '[Todos] Remove',
  props<{ todo: Todo }>()
);

export const markTodoAsCompleted = createAction(
  '[Todos] Mark as completed',
  props<{ todo: Todo }>()
);

export const markTodoAsPending = createAction(
  '[Todos] Mark as pending',
  props<{ todo: Todo }>()
);

export const clearCompletedTodos = createAction('[Todos] Clear completed');
