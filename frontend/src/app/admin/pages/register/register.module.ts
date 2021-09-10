import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RegisterRoutingModule } from './register-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterService } from './service/register.service';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AUTH_STATE_NAME } from '../../@theme/admin-service/store/auth.selector';
import { AuthReducer } from '../../@theme/admin-service/store/auth.reducer';
import { AuthEffects } from '../../@theme/admin-service/store/auth.effects';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    ThemeModule,
    RegisterRoutingModule,
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    EffectsModule.forFeature(),
  ],
  providers: []
})
export class RegisterModule { }
