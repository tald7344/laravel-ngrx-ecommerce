import { createAction, props } from "@ngrx/store";
import {User} from '../../../pages/register/model/user';

export const startLogin = createAction(
    '[Auth / API] Start Login',
    props<{ data: {email: string, password: string}, email: string }>()
);

export const loginSuccess = createAction(
'[Auth / API] Login Success',
  props<{ user: User, redirect: boolean }>()
);

export const loginFailure = createAction(
  '[Auth / API] Login Failure',
  props<{ error: string }>()
);

export const autoLogin = createAction('[Auth / API] Auto Login');

export const startlogout = createAction(
  '[Auth / API] Start Logout'
);

export const logoutSuccess = createAction('[Auth / API] Logout Success');

export const sendPasswordResetLink = createAction(
  '[Auth / API] Send Password Reset Link',
  props<{ email: string }>()
);

export const sendPasswordResetLinkSuccess = createAction('[Auth / API] Send Password Reset Link Success');

export const sendPasswordResetLinkFailure = createAction(
  '[Auth / API] Send Password Reset Link Failure',
  props<{ error: string }>()
);

export const changePassword = createAction(
  '[Auth / API] Change Password',
  props<{ email: string, password: string, password_confirmation: string, resetToken: string }>()
);

export const changePasswordSuccess = createAction(
  '[Auth / API] Change Password Success'
);

export const changePasswordFailure = createAction(
  '[Auth / API] Change Password Failure',
  props<{ error: string }>()
);