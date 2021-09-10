import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Countries } from '../model/countries.model';

export const loadCountries = createAction(
  '[Countries/API] Load Countries'
);

export const loadCountriesSuccess = createAction(
  '[Countries/API] Load Countries Success',
  props<{ countries: Countries[] }>()
);

export const loadCountriesFailure = createAction(
  '[Countries/API] Load Countries Failure',
  props<{ error: string }>()
);


export const loadCountry = createAction(
  '[Countries/API] Load Country',
  props<{ id: string }>()
);

export const loadCountrySuccess = createAction(
  '[Countries/API] Load Country Success',
  props<{ country: Countries }>()
);

export const loadCountryFailure = createAction(
  '[Countries/API] Load Country Failure',
  props<{ error: string }>()
);

export const addCountry = createAction(
  '[Countries/API] Add Country',
  props<{ country: Countries }>()
);

export const addCountrySuccess = createAction(
  '[Countries/API] Add Country Success',
  props<{ country: Countries }>()
);

export const addCountryFailure = createAction(
  '[Countries/API] Add Country Failure',
  props<{ error: string }>()
);

export const updateCountry = createAction(
  '[Countries/API] Update Country',
  props<{ country: Countries }>()
);

export const updateCountrySuccess = createAction(
  '[Countries/API] Update Country Success',
  props<{ country: Update<Countries> }>()
);

export const updateCountryFailure = createAction(
  '[Countries/API] Update Country Failure',
  props<{ error: string }>()
);

export const deleteCountry = createAction(
  '[Countries/API] Delete Country',
  props<{ id: string }>()
);

export const deleteCountrySuccess = createAction(
  '[Countries/API] Delete Country Success',
  props<{ id: string }>()
);

export const deleteCountryFailure = createAction(
  '[Countries/API] Delete Country Failure',
  props<{ error: string }>()
);

export const deleteCountryFlag = createAction(
  '[Countries/API] Delete Country Flag',
  props<{ flagUrl: string }>()
);

export const deleteCountryFlagSuccess = createAction(
  '[Countries/API] Delete Country Flag Success'
);

export const dummyCountriesAction = createAction('[Countries/API] Dummy Countries Action');

