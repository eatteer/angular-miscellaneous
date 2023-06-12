import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosActions, TodosApiActions, TodosSelectors } from '.';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TodosEffects {
  public constructor(
    public store: Store,
    public actions$: Actions,
    public todosService: TodosService
  ) {}

  public load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.init),
      switchMap((action) =>
        this.todosService.load().pipe(
          map((todos) => TodosApiActions.loadSuccess({ todos })),
          catchError(() =>
            of(
              TodosApiActions.loadError({
                message: 'Something went wrong while loading todos',
              })
            )
          )
        )
      )
    )
  );

  public add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.add),
      switchMap((action) =>
        this.todosService.add(action.todo).pipe(
          map((todo) => TodosApiActions.addSuccess({ todo })),
          catchError(() =>
            of(
              TodosApiActions.addError({
                message: 'Something went wrong while adding todo',
              })
            )
          )
        )
      )
    )
  );

  public remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.remove),
      switchMap((action) =>
        this.todosService.remove(action.todo).pipe(
          map(() => TodosApiActions.removeSuccess({ todo: action.todo })),
          catchError(() =>
            of(
              TodosApiActions.removeError({
                message: 'Something went wrong while removing todo',
              })
            )
          )
        )
      )
    )
  );

  public markAsCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.markAsCompleted),
      switchMap((action) =>
        this.todosService.markAsCompleted(action.todo).pipe(
          map((todo) => TodosApiActions.markAsCompletedSuccess({ todo })),
          catchError(() =>
            of(
              TodosApiActions.markAsCompletedError({
                message: 'Something went wrong while marking as completed todo',
              })
            )
          )
        )
      )
    )
  );

  public clearCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.clearCompleted),
      switchMap((action) => this.store.select(TodosSelectors.completedTodos)),
      switchMap((completedTodos) =>
        this.todosService.clearCompleted(completedTodos).pipe(
          map(() => TodosApiActions.clearCompletedSuccess()),
          catchError(() =>
            of(
              TodosApiActions.clearCompletedError({
                message: 'Something went wrong while clearing completed todos',
              })
            )
          )
        )
      )
    )
  );

  public markAsPending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.markAsPending),
      switchMap((action) =>
        this.todosService.markAsPending(action.todo).pipe(
          map((todo) => TodosApiActions.markAsPendingSuccess({ todo })),
          catchError(() =>
            of(
              TodosApiActions.markAsPendingError({
                message: 'Something went wrong while marking as pending todo',
              })
            )
          )
        )
      )
    )
  );

  public notifyError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TodosApiActions.loadError,
          TodosApiActions.addError,
          TodosApiActions.removeError,
          TodosApiActions.markAsCompletedError,
          TodosApiActions.markAsPendingError,
          TodosApiActions.clearCompletedError
        ),
        tap((action) => alert(action.message))
      ),
    { dispatch: false }
  );
}
