import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, concatMap, delay, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { AdminService } from '../services/admin.service';
import * as adminActions from '../store/admin.actions';
import { adminsSelector } from './admin.selector';


@Injectable()
export class AdminEffects {

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private adminService: AdminService,
              private router: Router,
              private toaster: ToastrService) {}


  loadAdmins$ = createEffect(() => this.actions$.pipe(
    ofType(adminActions.loadAdmins),
    withLatestFrom(this.store.select(adminsSelector)),    // use to fetch latest data stored to increase the performance
    switchMap(([action, admins]) => {
      // check if there isn't admins stored or if there is one admin fetch
      // (which mean get admin from getAdminById not from getAllAdmins)
      if (!admins.length || admins.length === 1) {
        return this.adminService.getAdmins().pipe(
          map(adminsResponse => {
            return adminActions.loadAdminsSuccess(adminsResponse);
          }),
          catchError(error => of(adminActions.loadAdminsFailure({error})))
        )
      }
      return of(adminActions.dummyAction());
    })
  ));

  loadAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(adminActions.loadAdmin),
    mergeMap(action => this.adminService.getAdmin(action.id)
      .pipe(
        map(admin => adminActions.loadAdminSuccess(admin)),
        catchError(error => of(adminActions.loadAdminFailure(error)))
      ))
  ));

  AddAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(adminActions.addAdmin),
    mergeMap(action => this.adminService.addAdmin(action.admin)
      .pipe(
        map((response: any) => {
          this.toaster.success(response.Success);
          return adminActions.addAdminSuccess({admin: response.data});
        }),
        catchError(error => of(adminActions.addAdminFailure(error)))
      )
    ),
    tap((res: any) => {
      console.log(res);
      if (res?.error?.error?.email[0]) {
        this.toaster.error(res?.error.error.email[0]);
        return;
      }
      // this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      this.router.navigate(['admin/admins']);
    })
  ));

  deleteAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(adminActions.deleteAdmin),
    mergeMap(action => this.adminService.deleteAdmin(action.id)
    .pipe(
      map(response => {
        return adminActions.deleteAdminSuccess({ id: action.id });
      }),
      catchError(error => of(adminActions.deleteAdminFailure({error})))
    ))
  ));

  updateAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(adminActions.updateAdmin),
    concatMap(action => this.adminService.updateAdmin(
        +action.admin.id,
        action.admin.changes
      )
    ),
    tap(() => this.router.navigate(['/admin/admins']))
    ), { dispatch: false }   // We Must Use Dispatch To False To Work Correctly
  );

  getSingleAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((r: RouterNavigatedAction) => {
      return r.payload.routerState.url.startsWith('/admin/admins/edit');
    }),
    map((r: RouterNavigatedAction) => {
      return r.payload.routerState['params']['id'];
    }),
    withLatestFrom(this.store.select(adminsSelector)),
    switchMap(([id, admins]) => {
      if (!admins.length) {
        return this.adminService.getAdmins().pipe(
          map(adminResponse => {
            return adminActions.loadAdminsSuccess(adminResponse);
          })
        );
      }
      return of(adminActions.dummyAction());
    }))
  );

}
