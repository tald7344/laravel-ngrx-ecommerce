import {createFeatureSelector, createSelector} from '@ngrx/store';
import {maintenanceFeatureKey, MaintenanceState} from './maintenance.reducer';

const maintenanceFeatureState = createFeatureSelector(maintenanceFeatureKey);

export const getMaintenanceSelector = createSelector(
  maintenanceFeatureState,
  (state: MaintenanceState) => {
    return state.maintenance;
  }
);

// export const getUnderMaintenanceSelector = createSelector(
//   maintenanceFeatureState,
//   (state: MaintenanceState) => {
//     debugger;
//     if (state?.maintenance != undefined) {
//       return state?.maintenance?.status == 'close' ? true : false;
//     }
//   }
// );
