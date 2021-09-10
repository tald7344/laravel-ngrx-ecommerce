import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as maintenanceActions from './maintenance.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {MaintenanceService} from '../../../pages/maintenance/services/maintenance.service';
import {of} from 'rxjs';



@Injectable()
export class MaintenanceEffects {

  constructor(private actions$: Actions,
              private maintenanceService: MaintenanceService) {}

  underMaintenance$ = createEffect(() => this.actions$.pipe(
    ofType(maintenanceActions.loadUnderMaintenance),
    switchMap(() => this.maintenanceService.underMaintenance()
      .pipe(
        map(response => maintenanceActions.loadUnderMaintenanceSuccess(response))
      ))
  ));

}
