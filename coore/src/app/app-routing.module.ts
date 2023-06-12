import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authGuard } from './guards/auth/auth.guard';
import { primeGuard } from './guards/prime/prime.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
        canActivate: [primeGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
