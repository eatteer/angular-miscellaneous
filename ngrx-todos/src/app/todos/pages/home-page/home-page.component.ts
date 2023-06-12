import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../entities/todo.entity';
import { TodosActions, TodosSelectors } from '../../state/index';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public todos$: Observable<Todo[]> = this._store.select(TodosSelectors.todos);
  public hasCompletedTodos$: Observable<boolean> = this._store.select(
    TodosSelectors.hasCompletedTodos
  );

  public constructor(private _store: Store) {}

  public addTodo(description: string): void {
    const todo: Todo = {
      id: uuidv4(),
      description,
      completed: false,
    };

    this._store.dispatch(TodosActions.add({ todo }));
  }

  public removeTodo(todo: Todo): void {
    this._store.dispatch(TodosActions.remove({ todo }));
  }

  public changeCompletedState(todo: Todo): void {
    if (todo.completed) this.markTodoAsPending(todo);
    else this.markTodoAsCompleted(todo);
  }

  public markTodoAsCompleted(todo: Todo): void {
    this._store.dispatch(TodosActions.markAsCompleted({ todo }));
  }

  public markTodoAsPending(todo: Todo): void {
    this._store.dispatch(TodosActions.markAsPending({ todo }));
  }

  public clearCompletedTodos(): void {
    this._store.dispatch(TodosActions.clearCompleted());
  }
}
