import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Todo } from '../../entities/todo.entity';
import { TodosActions, TodosSelectors } from '../../state/index';
import { AddTodoDto } from '../../services/todos.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public todos$: Observable<Todo[]> = this.store.select(TodosSelectors.todos);
  public hasCompletedTodos$: Observable<boolean> = this.store.select(
    TodosSelectors.hasCompletedTodos
  );

  public todoDescriptionControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(TodosActions.init());
  }

  public addTodo(): void {
    const description = this.todoDescriptionControl.value;
    const todo: AddTodoDto = {
      description,
      completed: false,
    };

    this.store.dispatch(TodosActions.add({ todo }));
  }

  public removeTodo(todo: Todo): void {
    this.store.dispatch(TodosActions.remove({ todo }));
  }

  public changeCompletedState(todo: Todo): void {
    if (todo.completed) this.markTodoAsPending(todo);
    else this.markTodoAsCompleted(todo);
  }

  public markTodoAsCompleted(todo: Todo): void {
    this.store.dispatch(TodosActions.markAsCompleted({ todo }));
  }

  public markTodoAsPending(todo: Todo): void {
    this.store.dispatch(TodosActions.markAsPending({ todo }));
  }

  public clearCompletedTodos(): void {
    this.store.dispatch(TodosActions.clearCompleted());
  }
}
