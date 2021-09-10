import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Admin } from '../models/admin.model';



export const loadAdmins = createAction(
  '[Admin/API] Load Admins'
);

export const loadAdminsSuccess = createAction(
  '[Admin/API] Load Admins Success',
  props<{ data: Admin[] }>()
);

export const loadAdminsFailure = createAction(
  '[Admin/API] Load Admins Failure',
  props<{ error: string }>()
);

export const loadAdmin = createAction(
  '[Admin Component/API] Load Admin',
  props<{ id: number }>()
);

export const loadAdminSuccess = createAction(
  '[Admin Effects/API] Load Admin Success',
  props<{ data: Admin }>()
);

export const loadAdminFailure = createAction(
  '[Admin Effects/API] Load Admin Failure',
  props<{ error: string }>()
);

export const addAdmin = createAction(
  '[Admin Components/API] Add Admin',
  props<{ admin: Admin }>()
);

export const addAdminSuccess = createAction(
  '[Admin Effects/API] Add Admin Success',
  props<{ admin: Admin }>()
);

export const addAdminFailure = createAction(
  '[Admin Effects/API] Add Admin Failure',
  props<{ error: any }>()
);

export const deleteAdmin = createAction(
  '[Admin Component/API] Delete Admin',
  props<{ id: number }>()
);

export const deleteAdminSuccess = createAction(
  '[Admin Effects/API] Delete Admin Success',
  props<{ id: number }>()
);

export const deleteAdminFailure = createAction(
  '[Admin Effects/API] Delete Admin Failure',
  props<{ error: string }>()
);

export const updateAdmin = createAction(
  '[Admin Components/API] Update Admin',
  props<{ admin: Update<Admin> }>()
);

export const dummyAction = createAction('[Admin Effect/API] Dummy Action');
// export const updateAdminSuccess = createAction(
//   '[Admin Effects/API] Update Admin Success',
//   props<{ admin: Update<Admin> }>()
// );

// export const updateAdminFailure = createAction(
//   '[Admin Effects/API] Update Admin Failure',
//   props<{ error: string }>()
// );




export const upsertAdmin = createAction(
  '[Admin/API] Upsert Admin',
  props<{ admin: Admin }>()
);

export const upsertAdmins = createAction(
  '[Admin/API] Upsert Admins',
  props<{ admins: Admin[] }>()
);

export const updateAdmins = createAction(
  '[Admin/API] Update Admins',
  props<{ admins: Update<Admin>[] }>()
);

export const clearAdmins = createAction(
  '[Admin/API] Clear Admins'
);
