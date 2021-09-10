import { createReducer, on } from "@ngrx/store";
import { setLoadSpinner } from "./shared.actions";
import { initialState } from "./shared.state";


const _sharedReducer = createReducer(
    initialState,
    on(setLoadSpinner, (state, action) => {
        return {
            ...state,
            status: action.status
        };
    })
);


export function SharedReducer(state, action) {
    return _sharedReducer(state, action);
}