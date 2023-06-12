import { createReducer, on } from '@ngrx/store';
import { Todo } from '../entities/todo.entity';
import { TodosApiActions } from '.';

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(TodosApiActions.loadSuccess, (currentState, action) => ({
    todos: action.todos,
  })),
  on(TodosApiActions.addSuccess, (currentState, action) => {
    return { ...currentState, todos: [...currentState.todos, action.todo] };
  }),
  on(TodosApiActions.removeSuccess, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.filter((todo) => todo.id !== action.todo.id),
    };
  }),
  on(TodosApiActions.markAsCompletedSuccess, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.map((todo) => {
        if (todo.id === action.todo.id) return { ...todo, completed: true };
        return todo;
      }),
    };
  }),
  on(TodosApiActions.markAsPendingSuccess, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.map((todo) => {
        if (todo.id === action.todo.id) return { ...todo, completed: false };
        return todo;
      }),
    };
  }),
  on(TodosApiActions.clearCompletedSuccess, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.filter((todo) => todo.completed === false),
    };
  })
);
