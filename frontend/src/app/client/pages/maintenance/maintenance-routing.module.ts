import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';


const routes: Routes = [
  { path: '', component: UnderMaintenanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
