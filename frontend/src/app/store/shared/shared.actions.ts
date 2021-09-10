import { createAction, props } from "@ngrx/store";


export const setLoadSpinner = createAction(
    '[shared state] set loading spinner',
    props<{ status: boolean }>()
);
