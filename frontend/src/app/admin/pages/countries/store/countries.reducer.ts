import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Countries } from '../model/countries.model';
import * as CountriesActions from './countries.actions';

export const countriesFeatureKey = 'countries';

export interface CountriesState extends EntityState<Countries> {
  // additional entities state properties
  countries: Countries[];
  countryDetails: Countries;
  error: string;
}

export const adapter: EntityAdapter<Countries> = createEntityAdapter<Countries>();

export const initialState: CountriesState = adapter.getInitialState({
  // additional entity state properties
  countries: undefined,
  countryDetails: undefined,
  error: undefined
});


export const reducer = createReducer(
  initialState,
  on(CountriesActions.loadCountriesSuccess,
    (state, action) => adapter.setAll(action.countries, state)
  ),
  on(CountriesActions.loadCountriesFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
  }),
  on(CountriesActions.loadCountrySuccess,
    (state, action) => {
      return {
        ...state,
        countryDetails: action.country
      };
    }),
  on(CountriesActions.loadCountryFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }),
  on(CountriesActions.addCountrySuccess,
    (state, action) => adapter.addOne(action.country, state)
  ),
  on(CountriesActions.addCountryFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(CountriesActions.updateCountrySuccess,
    (state, action) => adapter.updateOne(action.country, state)
  ),
  on(CountriesActions.updateCountryFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(CountriesActions.deleteCountrySuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CountriesActions.deleteCountryFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  )
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
