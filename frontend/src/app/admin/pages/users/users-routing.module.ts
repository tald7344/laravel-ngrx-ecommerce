import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {CompanyUsersComponent} from './components/company-users/company-users.component';


const routes: Routes = [
  { path: '', component: AllUsersComponent},
  { path: 'company', component: CompanyUsersComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'edit/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
