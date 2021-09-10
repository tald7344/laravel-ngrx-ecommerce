import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME = 'shared';

export const SHARED_FEATURE_STATE = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoadSpinner = createSelector(SHARED_FEATURE_STATE, (state) => state.showLoading);
