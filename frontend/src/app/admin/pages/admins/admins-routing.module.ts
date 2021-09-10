import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { ListAdminsComponent } from './components/list-admins/list-admins.component';


const routes: Routes = [
  { path: '', component: ListAdminsComponent },
  { path: 'add', component: AddAdminComponent },
  { path: 'edit/:id', component: EditAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
