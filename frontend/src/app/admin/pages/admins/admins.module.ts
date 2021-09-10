import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { AdminsRoutingModule } from './admins-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './store/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/admin.effects';
import { ListAdminsComponent } from './components/list-admins/list-admins.component';
import { AdminService } from './services/admin.service';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';


@NgModule({
  declarations: [ListAdminsComponent, AddAdminComponent, EditAdminComponent],
  imports: [
    ThemeModule,
    AdminsRoutingModule,
    StoreModule.forFeature(fromAdmin.adminsFeatureKey, fromAdmin.reducer),
    EffectsModule.forFeature([AdminEffects])
  ],
  providers: [AdminService]   // if Not provider the services here the route will not pass into the Interceptor
})
export class AdminsModule { }
