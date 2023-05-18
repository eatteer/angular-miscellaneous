import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecksFormPageComponent } from './pages/checks-form-page/checks-form-page.component';

const routes: Routes = [
  { path: 'checks-form', component: ChecksFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
