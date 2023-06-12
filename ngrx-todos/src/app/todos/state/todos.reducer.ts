import { createReducer, on } from '@ngrx/store';
import { Todo } from '../entities/todo.entity';
import { TodosActions } from '.';

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.init, (currentState, action) => ({
    todos: currentState.todos,
  })),
  on(TodosActions.add, (currentState, action) => {
    return { ...currentState, todos: [...currentState.todos, action.todo] };
  }),
  on(TodosActions.remove, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.filter((todo) => todo.id !== action.todo.id),
    };
  }),
  on(TodosActions.markAsCompleted, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.map((todo) => {
        if (todo.id === action.todo.id) return { ...todo, completed: true };
        return todo;
      }),
    };
  }),
  on(TodosActions.markAsPending, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.map((todo) => {
        if (todo.id === action.todo.id) return { ...todo, completed: false };
        return todo;
      }),
    };
  }),
  on(TodosActions.clearCompleted, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.filter((todo) => todo.completed === false),
    };
  })
);
