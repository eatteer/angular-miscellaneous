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
  on(TodosActions.initTodos, (currentState, action) => ({
    todos: currentState.todos,
  })),
  on(TodosActions.addTodo, (currentState, action) => {
    return { ...currentState, todos: [...currentState.todos, action.todo] };
  }),
  on(TodosActions.removeTodo, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.filter((todo) => todo.id !== action.todo.id),
    };
  }),
  on(TodosActions.markTodoAsCompleted, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.map((todo) => {
        if (todo.id === action.todo.id) return { ...todo, completed: true };
        return todo;
      }),
    };
  }),
  on(TodosActions.markTodoAsPending, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.map((todo) => {
        if (todo.id === action.todo.id) return { ...todo, completed: false };
        return todo;
      }),
    };
  }),
  on(TodosActions.clearCompletedTodos, (currentState, action) => {
    return {
      ...currentState,
      todos: currentState.todos.filter((todo) => todo.completed === false),
    };
  })
);
