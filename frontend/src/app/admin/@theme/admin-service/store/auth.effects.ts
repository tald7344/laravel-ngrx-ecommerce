import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {catchError, exhaustMap, map, mergeMap, tap} from 'rxjs/operators';
import * as authActions from './auth.actions';
import {TokenService} from '../token/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../pages/register/model/user';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {AppState} from '../../../../store/app.state';
import {RegisterService} from '../../../pages/register/service/register.service';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private registerService: RegisterService,
                private tokenService: TokenService,
                private router: Router,
                private toaster: ToastrService,
                private activatedRoute: ActivatedRoute) {}


    startLogin$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.startLogin),
        exhaustMap(action => this.registerService.login(action.data)
            .pipe(
                map(data => {
                    const user = new User(action.email, data.access_token, data.me, data.expires_in, data.token_type);
                    // this.tokenService.handle(action.email, data.access_token, data.expires_in);
                    this.tokenService.handle(user);
                    // this.authService.changeAuthStatus(true);
                    // console.log('data effect', data);
                    // debugger;
                    return authActions.loginSuccess({ user, redirect: true });
                }),
              catchError(error => {
                console.log('effect error', error);
                let errorMsg: string;
                if (error.error.error) {
                  errorMsg = error.error.error;
                }
                if (error.error.message) {
                  errorMsg = error.error.message;
                }
                if (error.error.errors) {
                  errorMsg = error.error;
                }
                return of(authActions.loginFailure({error: errorMsg}));
              }),
              tap(() => document.location.reload())
            ))
    ));


    redirectAfterLogin$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(action => {
        if (action.redirect) {
          this.router.navigate(['/admin']);
        }
      })
    ), { dispatch: false });


    autoLogin$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.autoLogin),
      mergeMap(action => {
        const user = this.tokenService.getTokenWithExpiry('user');
        return of(authActions.loginSuccess({user, redirect: false}));
      })
    ));


    startLogout$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.startlogout),
      map(() => {
        this.tokenService.deleteToken();
        this.toaster.success('Successfully Logout');
        this.router.navigate(['/admin/auth/login']);
      })
    ), { dispatch: false });


    sendPasswordResetLink$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.sendPasswordResetLink),
      exhaustMap(action => this.registerService.sendPasswordResetLink(action)
        .pipe(
          map(response => {
            console.log('effect response : ', response);
            this.toaster.success(response.success);
            return authActions.sendPasswordResetLinkSuccess();
          }),
          catchError(error => {
            let errorMsg: string;
            console.log('error effect : ', error);
            if (error.error.error) {
              errorMsg = error.error.error;
            }
            if (error.error.message) {
              errorMsg = error.error.message;
            }
            return of(authActions.sendPasswordResetLinkFailure({error: errorMsg}));
          })
        ))
    ));

    changePassword$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.changePassword),
      exhaustMap(action => this.registerService.changePassword(action.email, action.password, action.password_confirmation, action.resetToken)
        .pipe(
          map(response => {
            console.log('effect response : ', response);
            const user = new User(action.email, response.token.access_token, response.token.me, response.token.expires_in, response.token.token_type);
            // this.tokenService.handle(action.email, data.access_token, data.expires_in);
            this.tokenService.handle(user);
            this.toaster.success(response.success);
            return authActions.loginSuccess({ user, redirect: true });
          }),
          catchError(error => {
            console.log(error);
            let errorMsg: string;
            if (error.error.error) {
              errorMsg = error.error.error;
            }
            if (error.error.message) {
              errorMsg = error.error.message;
            }
            if (error.error.errors) {
              errorMsg = error.error;
            }
            return of(authActions.changePasswordFailure({error: errorMsg}));
          }),
          tap(() => document.location.reload())
        ))
    ));

}
