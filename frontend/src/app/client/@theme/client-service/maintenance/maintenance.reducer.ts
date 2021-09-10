import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Maintenance } from './maintenance.model';
import * as MaintenanceActions from './maintenance.actions';

export const maintenanceFeatureKey = 'maintenance';

export interface MaintenanceState extends EntityState<Maintenance> {
  // additional entities state properties
  maintenance: Maintenance;
}

export const adapter: EntityAdapter<Maintenance> = createEntityAdapter<Maintenance>();

export const initialState: MaintenanceState = adapter.getInitialState({
  // additional entity state properties
  maintenance: undefined
});


export const maintenanceReducer = createReducer(
  initialState,
  on(MaintenanceActions.loadUnderMaintenanceSuccess,
    (state, action) => {
      return {
        ...state,
        maintenance: action
      };
    }
  )
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
