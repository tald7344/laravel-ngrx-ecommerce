import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { adminsFeatureKey, AppState, selectAll } from "./admin.reducer";

// fetch the whole slice for product state
export const selectAppState = createFeatureSelector<AppState>(adminsFeatureKey);

export const adminsSelector = createSelector(selectAppState, selectAll);

export const adminSelector = createSelector(
    adminsSelector,
    getCurrentRoute,
    (admins, router: RouterStateUrl) => admins.find(admin => admin.id == router.params['id']));

export const adminErrors = createSelector(selectAppState, (state: AppState) => state.error);
