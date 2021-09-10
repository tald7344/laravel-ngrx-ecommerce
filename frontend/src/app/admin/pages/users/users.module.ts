import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { UsersService } from './services/users.service';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CompanyUsersComponent } from './components/company-users/company-users.component';


@NgModule({
  declarations: [AllUsersComponent, AddUserComponent, EditUserComponent, CompanyUsersComponent],
  imports: [
    ThemeModule,
    UsersRoutingModule,
    StoreModule.forFeature(fromUser.usersFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UsersService]   // if Not provider the services here the route will not pass into the Interceptor
})
export class UsersModule { }
