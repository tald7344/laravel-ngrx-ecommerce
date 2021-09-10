import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from '../model/user.model';

// LOAD Users
export const loadUsers = createAction(
  '[User/API] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User/API] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User/API] Load Users Failure',
  props<{ error: string }>()
);

// LOAD Company Users
export const loadCompanyUser = createAction(
  '[User/API] Load Company User',
  props<{ data: User[] }>()
);

// LOAD USER
export const loadUser = createAction(
  '[User Component/API] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[User/API] Load User Success',
  props<{ data: User }>()
);

export const loadUserFailure = createAction(
  '[User/API] Load User Failure',
  props<{ error: string }>()
);

// ADD USER
export const addUser = createAction(
  '[User/API] Add User',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[User Effect/API] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[User Effect/API] Add User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User Components/API] Update User',
  props<{ user: Update<User> }>()
);

// DELETE USER
export const deleteUser = createAction(
  '[User Components/API] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User Components/API] Delete User Success',
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  '[User Components/API] Delete User Failure',
  props<{ error: string }>()
);

export const approveUser = createAction(
  '[User Components/API] Approve User',
  props<{id: number, approve: number}>()
);

export const approveUserSuccess = createAction(
  '[User Effect/API] Approve User Success',
  props<{ user: Update<User> }>()
);

export const approveUserFailure = createAction(
  '[User Effect/API] Approve User Failure',
  props<{ error: string }>()
);

export const dummyAction = createAction('[User Effect/API] Dummy Action');

export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ user: User }>()
);

export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ users: User[] }>()
);

export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ users: User[] }>()
);

export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ users: Update<User>[] }>()
);


export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: string[] }>()
);

export const clearUsers = createAction(
  '[User/API] Clear Users'
);
