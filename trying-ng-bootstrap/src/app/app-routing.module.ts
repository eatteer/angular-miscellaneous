import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginationPageComponent } from './pages/pagination-page/pagination-page.component';
import { AppComponent } from './app.component';
import { ModalPageComponent } from './pages/modal-page/modal-page.component';

const routes: Routes = [
  { path: 'modal', component: ModalPageComponent },
  { path: 'pagination', component: PaginationPageComponent },
  { path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
