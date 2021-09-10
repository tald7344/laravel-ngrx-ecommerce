import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Maintenance } from './maintenance.model';

export const loadUnderMaintenance = createAction(
  '[Maintenance/API] Load Under Maintenance'
);

export const loadUnderMaintenanceSuccess = createAction(
  '[Maintenance/API] Load Under Maintenance Success',
  props<{ id: string, status: string, message: string }>()
);
