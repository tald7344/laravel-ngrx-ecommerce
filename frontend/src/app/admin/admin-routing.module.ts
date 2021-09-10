import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterLoginService } from './@theme/admin-service/guard/after-login.service';
import { BeforeLoginService } from './@theme/admin-service/guard/before-login.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AfterLoginService]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [BeforeLoginService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
