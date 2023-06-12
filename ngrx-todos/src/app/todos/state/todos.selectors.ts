import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

const todosState = createFeatureSelector<TodosState>('todosState');

export const todos = createSelector(
  todosState,
  (todosState) => todosState.todos
);

export const hasCompletedTodos = createSelector(todos, (todosState) =>
  todosState.some((todo) => todo.completed)
);
