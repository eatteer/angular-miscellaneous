import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

const todosState = createFeatureSelector<TodosState>('todosState');

export const todos = createSelector(
  todosState,
  (todosState) => todosState.todos
);

export const completedTodos = createSelector(todos, (todos) =>
  todos.filter((todo) => todo.completed)
);

export const hasCompletedTodos = createSelector(
  completedTodos,
  (completedTodos) => completedTodos.length > 0
);
