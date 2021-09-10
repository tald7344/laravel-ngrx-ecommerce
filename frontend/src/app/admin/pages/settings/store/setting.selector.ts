import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, settingsFeatureKey, SettingsState } from "./setting.reducer";

const settingsFeatureState = createFeatureSelector(settingsFeatureKey);

export const getSettingsSelector = createSelector(settingsFeatureState, (state: SettingsState) => state.settings);

export const getSettingsErrorSelector = createSelector(settingsFeatureState, (state: SettingsState) => state.error);
