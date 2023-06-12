import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodosRoutingModule } from './todos-routing.module';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './state';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './state/todos.effects';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todosState', todosReducer),
    EffectsModule.forFeature([TodosEffects]),
  ],
})
export class TodosModule {}
