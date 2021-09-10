import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, usersFeatureKey } from "./user.reducer";
import { UserState } from "./user.reducer";
import {getCurrentRoute} from '../../../../store/router/router.selector';
import {RouterStateUrl} from '../../../../store/router/custom-serializer';
import {User} from '../model/user.model';

// fetch the whole slice for product state
const usersFeatureState = createFeatureSelector<UserState>(usersFeatureKey);

export const allUsersSelector = createSelector(usersFeatureState, selectAll);

export const allCompanyUsersSelector = createSelector(usersFeatureState, (state: UserState) => state.companyUser);

export const UserDetailsSelector = createSelector(
    allUsersSelector,
    getCurrentRoute,
    (users: User[], route: RouterStateUrl) => users.find(user => user.id == route.params['id'])
);

export const getUserError = createSelector(usersFeatureState, (state: UserState) => state.error);
