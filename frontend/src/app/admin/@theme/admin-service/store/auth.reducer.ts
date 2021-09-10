import { createReducer, on } from "@ngrx/store";
import * as authActions from './auth.actions';
import { initialState } from "./auth.state";

const _authReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, action) => {
      return {
          ...state,
          user: action.user
      };
  }),
  on(authActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(authActions.logoutSuccess, (state, action) => {
    return {
      ...state,
      user: null
    };
  }),
  on(authActions.sendPasswordResetLinkFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(authActions.changePasswordFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);

export function AuthReducer(state, action) {
    return _authReducer(state, action);
}
