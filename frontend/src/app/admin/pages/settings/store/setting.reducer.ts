import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Setting } from '../model/setting.model';
import * as SettingActions from './setting.actions';

export const settingsFeatureKey = 'settings';

export interface SettingsState extends EntityState<Setting> {
  // additional entities state properties
  settings: Setting;
  error: string;
}

export const adapter: EntityAdapter<Setting> = createEntityAdapter<Setting>();

export const initialState: SettingsState = adapter.getInitialState({
  // additional entity state properties
  settings: undefined,
  error: undefined
});


export const reducer = createReducer(
  initialState,
  // on(SettingActions.loadSettingsSuccess,
  //   (state, action) => adapter.setOne(action.settings, state)),
  on(SettingActions.loadSettingsSuccess,
    (state, action) => {
      return {
        ...state,
        settings: action.settings
      }
    }
  ),
  on(SettingActions.loadSettingsFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(SettingActions.saveSettingsSuccess,
    (state, action) => adapter.updateOne(action.settings, state)),
  on(SettingActions.saveSettingsFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
