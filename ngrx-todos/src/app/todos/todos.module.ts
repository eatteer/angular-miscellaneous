import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodosRoutingModule } from './todos-routing.module';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './state';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    StoreModule.forFeature('todosState', todosReducer),
  ],
})
export class TodosModule {}
