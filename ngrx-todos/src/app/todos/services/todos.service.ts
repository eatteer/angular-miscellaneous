import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../entities/todo.entity';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

export type AddTodoDto = Omit<Todo, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public constructor(private httpClient: HttpClient) {}

  public load(): Observable<Todo[]> {
    const endpoint = `${environment.API_URL}/todos`;
    return this.httpClient.get<Todo[]>(endpoint);
  }

  public add(todo: AddTodoDto): Observable<Todo> {
    const endpoint = `${environment.API_URL}/todos`;
    return this.httpClient.post<Todo>(endpoint, todo);
  }

  public remove(todo: Todo): Observable<void> {
    const endpoint = `${environment.API_URL}/todos/${todo.id}`;
    return this.httpClient.delete<void>(endpoint);
  }

  public markAsCompleted(todo: Todo): Observable<Todo> {
    const updateTodoDto = this.markTodoAsCompleted(todo);

    const endpoint = `${environment.API_URL}/todos/${todo.id}`;
    return this.httpClient.put<Todo>(endpoint, updateTodoDto);
  }

  public markAsPending(todo: Todo): Observable<Todo> {
    const updateTodoDto = this.markTodoAsPending(todo);
    const endpoint = `${environment.API_URL}/todos/${todo.id}`;
    return this.httpClient.put<Todo>(endpoint, updateTodoDto);
  }

  public clearCompleted(todos: Todo[]): Observable<void[]> {
    const endpoint = (id: string) => `${environment.API_URL}/todos/${id}`;
    const requestOfTodosToClear = todos.map((todo) =>
      this.httpClient.delete<void>(endpoint(todo.id))
    );
    return forkJoin(requestOfTodosToClear);
  }

  private markTodoAsCompleted(todo: Todo): Todo {
    return {
      ...todo,
      completed: true,
    };
  }

  private markTodoAsPending(todo: Todo): Todo {
    return {
      ...todo,
      completed: false,
    };
  }
}
