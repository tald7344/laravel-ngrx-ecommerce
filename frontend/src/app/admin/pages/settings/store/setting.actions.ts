import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Setting } from '../model/setting.model';

export const loadSettings = createAction(
  '[Setting/API] Load Settings'
);

export const loadSettingsSuccess = createAction(
  '[Setting/API] Load Settings Success', 
  props<{ settings: Setting }>()
);

export const loadSettingsFailure = createAction(
  '[Setting/API] Load Settings Failure', 
  props<{ error: string }>()
);

export const saveSettings = createAction(
  '[Setting/API] Save Settings',
  props<{ settings: Setting }>()
);

export const saveSettingsSuccess = createAction(
  '[Setting/API] Save Settings Success', 
  props<{ settings: Update<Setting> }>()
);

export const saveSettingsFailure = createAction(
  '[Setting/API] Save Settings Failure', 
  props<{ error: string }>()
);