import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../model/user.model';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {
  // additional entities state properties
  data: User[];
  companyUser: User[];
  selectedUser: User;
  error: string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  data: undefined,
  companyUser: undefined,
  selectedUser: undefined,
  error: undefined
});


export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess,
    (state, action) => adapter.setAll(action.data, state)
  ),
  on(UserActions.loadUsersFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(UserActions.loadCompanyUser,
    (state, action) => {
      const companyUser = action.data.filter(user => user.level === 'company');
      return {
        ...state,
        companyUser
      };
    }
  ),
  on(UserActions.addUserSuccess,
    (state, action) => adapter.addOne(action.user, state)
  ),
  on(UserActions.addUserFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(UserActions.loadUserSuccess,
    (state, action) => {
      return {
        ...state,
        selectedUser: action.data
      }
    }
  ),
  on(UserActions.loadUserFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(UserActions.updateUser,
    (state, action) => adapter.updateOne(action.user, state)
  ),
  on(UserActions.deleteUserSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUserFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(UserActions.approveUserSuccess,
    (state, action) => adapter.updateOne(action.user, state)
  ),
  on(UserActions.approveUserFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(UserActions.upsertUser,
    (state, action) => adapter.upsertOne(action.user, state)
  ),
  on(UserActions.addUsers,
    (state, action) => adapter.addMany(action.users, state)
  ),
  on(UserActions.upsertUsers,
    (state, action) => adapter.upsertMany(action.users, state)
  ),
  on(UserActions.updateUsers,
    (state, action) => adapter.updateMany(action.users, state)
  ),
  on(UserActions.deleteUsers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(UserActions.clearUsers,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
