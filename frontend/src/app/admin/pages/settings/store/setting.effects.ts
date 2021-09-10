import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Setting } from '../model/setting.model';
import { SettingsService } from '../services/settings.service';
import * as settingsActions from './setting.actions';


@Injectable()
export class SettingEffects {

  constructor(private actions$: Actions,
              private settingsService: SettingsService,
              private toaster: ToastrService) {}

  loadSettings$ = createEffect(() => this.actions$.pipe(
    ofType(settingsActions.loadSettings),
    switchMap(() => this.settingsService.getSettings()
      .pipe(
        map(response => settingsActions.loadSettingsSuccess({settings: response.settings})),
        catchError(error => of(settingsActions.loadSettingsFailure({error})))
      ))
  ));

  saveSettings$ = createEffect(() => this.actions$.pipe(
    ofType(settingsActions.saveSettings),
    switchMap(action => this.settingsService.saveSettings(action.settings)
      .pipe(
        map(response => {
          const newSettings: Update<Setting> = {
            id: action.settings.id,
            changes: {
              ...action.settings
            }
          };
          this.toaster.success(response.success);
          return settingsActions.saveSettingsSuccess({settings: newSettings});
        }),
        catchError(error => of(settingsActions.saveSettingsFailure({error})))
      ))
  ), { dispatch: false });
}
