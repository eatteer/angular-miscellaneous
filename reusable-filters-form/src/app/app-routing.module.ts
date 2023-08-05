import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaingsComponent } from './pages/campaings/campaings.component';

const routes: Routes = [
  {
    path: 'campaigns',
    component: CampaingsComponent,
  },
  {
    path: '**',
    redirectTo: 'campaigns',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
