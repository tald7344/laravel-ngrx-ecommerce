import {createFeatureSelector, createSelector} from '@ngrx/store';
import { User } from 'src/app/admin/pages/register/model/user';
import {AuthState} from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const authFeatureState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const loginSuccessSelector = createSelector(authFeatureState, state => {
  return !!state.user;
});

export const loginFailureSelector = createSelector(authFeatureState, state => state.error);

export const getTokenSelector = createSelector(
  authFeatureState, (state) => {
    return state?.user ? state?.user?.accessToken : null;
  }
);

export const sendPasswordResetLinkErrorSelector = createSelector(authFeatureState, state => state.error);

export const changePasswordErrorSelector = createSelector(authFeatureState, state => state.error);