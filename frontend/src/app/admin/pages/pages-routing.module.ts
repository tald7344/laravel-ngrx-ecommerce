import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
    {
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'dashboard',
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        },
        {
          path: 'admins',
          loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule),
        },
        {
          path: 'users',
          loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        },
        {
          path: 'countries',
          loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
        },
        {
          path: 'settings',
          loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
