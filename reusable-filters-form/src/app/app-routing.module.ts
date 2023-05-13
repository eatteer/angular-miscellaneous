import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaingsPageComponent } from './pages/campaings-page/campaings-page.component';

const routes: Routes = [
  {
    path: 'campaigns',
    component: CampaingsPageComponent,
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
