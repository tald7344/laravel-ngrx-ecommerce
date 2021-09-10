import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { SharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';
import { AUTH_STATE_NAME } from '../admin/@theme/admin-service/store/auth.selector';
import {AuthState} from '../admin/@theme/admin-service/store/auth.state';
import {AuthReducer} from '../admin/@theme/admin-service/store/auth.reducer';
import { maintenanceFeatureKey, maintenanceReducer, MaintenanceState } from '../client/@theme/client-service/maintenance/maintenance.reducer';


export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
    router: RouterReducerState;
    [maintenanceFeatureKey]: MaintenanceState;
}

export const appReducer = {
    [SHARED_STATE_NAME]: SharedReducer,
    [AUTH_STATE_NAME]: AuthReducer,
    router: routerReducer,
    [maintenanceFeatureKey]: maintenanceReducer
};
