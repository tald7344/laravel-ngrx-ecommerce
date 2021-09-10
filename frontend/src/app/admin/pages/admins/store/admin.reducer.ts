import { Action, createReducer, MetaReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Admin } from '../models/admin.model';
import * as AdminActions from './admin.actions';
// import { AppState } from '.';
import { environment } from 'src/environments/environment';

export const adminsFeatureKey = 'admins';

export interface AppState extends EntityState<Admin> {
  // additional entities state properties
  data: Admin[];
  selectedAdmin: Admin;
  error: any;
}

export const adapter: EntityAdapter<Admin> = createEntityAdapter<Admin>();

export const initialState: AppState = adapter.getInitialState({
  // additional entity state properties
  data: undefined,
  selectedAdmin: undefined,
  error: undefined
});


export const reducer = createReducer(
  initialState,

  on(AdminActions.loadAdminsSuccess,
    (state, action) => adapter.setAll(action.data, state)
  ),
  on(AdminActions.loadAdminsFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(AdminActions.loadAdminSuccess,
    (state, action) => {
      return {
        ...state,
        selectedAdmin: action.data
      };
    }
  ),
  on(AdminActions.loadAdminFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
  on(AdminActions.addAdminSuccess,
    (state, action) => adapter.addOne(action.admin, state)
  ),
  on(AdminActions.addAdminFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
  on(AdminActions.deleteAdminSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AdminActions.deleteAdminFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
  }),
  on(AdminActions.updateAdmin,
    (state, action) => adapter.updateOne(action.admin, state)
  ),
  // on(AdminActions.updateAdminFailure,
  //   (state, action) => {
  //     return {
  //       ...state,
  //       error: action.error
  //     }
  // }),

  on(AdminActions.upsertAdmin,
    (state, action) => adapter.upsertOne(action.admin, state)
  ),
  on(AdminActions.upsertAdmins,
    (state, action) => adapter.upsertMany(action.admins, state)
  ),
  on(AdminActions.updateAdmins,
    (state, action) => adapter.updateMany(action.admins, state)
  ),
  // on(AdminActions.deleteAdmin,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  // on(AdminActions.deleteAdmins,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  on(AdminActions.clearAdmins,
    state => adapter.removeAll(state)
  ),
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
