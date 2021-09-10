import {createFeatureSelector, createSelector} from '@ngrx/store';
import {countriesFeatureKey, CountriesState, selectAll } from './countries.reducer';
import {getCurrentRoute} from '../../../../store/router/router.selector';
import {RouterStateUrl} from '../../../../store/router/custom-serializer';
import {adminsSelector} from '../../admins/store/admin.selector';

const countriesFeatureState = createFeatureSelector<CountriesState>(countriesFeatureKey);

export const getCountriesSelector = createSelector(countriesFeatureState, selectAll);

export const getCountryDetailsSelector = createSelector(
  getCountriesSelector,
  getCurrentRoute,
  (countries, router: RouterStateUrl) => countries.find(admin => admin.id == router.params['id']));

export const getCountriesErrorSelector = createSelector(countriesFeatureState, (state: CountriesState) => state.error);

