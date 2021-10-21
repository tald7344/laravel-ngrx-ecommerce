import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import {catchError, exhaustMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import * as userAction from '../store/user.actions';
import {Store} from '@ngrx/store';
import {UserState} from './user.reducer';
import {Update} from '@ngrx/entity';
import {User} from '../model/user.model';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { allUsersSelector } from './user.selector';


@Injectable()
export class UserEffects {



  constructor(private actions$: Actions,
              private store: Store<UserState>,
              private userService: UsersService,
              private toaster: ToastrService,
              private router: Router) {}


  // Load Users Effects
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.loadUsers),
    withLatestFrom(this.store.select(allUsersSelector)),
    mergeMap(([action, users]) => {
      if (!users.length || users.length === 1) {
        return this.userService.allUsers().pipe(
          map(response => {
            this.store.dispatch(userAction.loadCompanyUser(response));
            // userAction.loadCompanyUserSuccess(response);
            return userAction.loadUsersSuccess(response);
          }),
          catchError(error => of(userAction.loadUsersFailure(error)))
        )
      }
      return of(userAction.dummyAction());
    }
  )));

  // Load User Effects
  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.loadUser),
    mergeMap(action => this.userService.UserDetails(action.id)
    .pipe(
      map(response => userAction.loadUserSuccess(response)),
      catchError(error => of(userAction.loadUserFailure(error)))
    )
  )));


  // Add User Effects
  AddUser$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.addUser),
    mergeMap(action => this.userService.addUser(action.user)
      .pipe(
        map((response: any) => {
          this.toaster.success(response?.success);
          return userAction.addUserSuccess({user: response.data});
        }),
        catchError(error => of(userAction.addUserFailure(error)))
      )
    ),
    tap((res: any) => {
      console.log('Effect Response : ', res);
      if (res?.error?.error?.email[0]) {
        this.toaster.error(res?.error.error.email[0]);
        return;
      }
      this.router.navigate(['/admin/users']);
    })
  ));


  // Update User Effect
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.updateUser),
    mergeMap(action => this.userService.updateUser(
      +action.user.id,
      action.user.changes
    )),
    tap(() => this.router.navigate(['/admin/users']))
  ), { dispatch: false });


  // Delete User Effect
  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.deleteUser),
    mergeMap(action => this.userService.deleteUser(action.id)
      .pipe(
        map(response => userAction.deleteUserSuccess({id: action.id})),
        catchError(error => of(userAction.deleteUserFailure(error)))
      ))
  ));

  // Approve User
  approveUser$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.approveUser),
    switchMap(action => this.userService.approveUser(action.id, action.approve)
      .pipe(
        map(response => {
          const approvedUser: Update<User> = {
            id: action.id,
            changes: { ...response.user }
          };
          return userAction.approveUserSuccess({user: approvedUser});
        }),
        catchError(error => of(userAction.approveUserFailure({error})))
      ))
  ));

  getSingleUser$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((r: RouterNavigatedAction) => {
      return r.payload.routerState.url.startsWith('/admin/users/edit');
    }),
    map((r: RouterNavigatedAction) => {
      return r.payload.routerState['params']['id'];
    }),
    withLatestFrom(this.store.select(allUsersSelector)),
    switchMap(([id, users]) => {
      if (!users.length) {
        return this.userService.allUsers().pipe(
          map(usersResponse => {
            console.log('user response : ', usersResponse);
            return userAction.loadUsersSuccess(usersResponse);
          })
        )
      }
      return of(userAction.dummyAction());
    })
  ));
}
