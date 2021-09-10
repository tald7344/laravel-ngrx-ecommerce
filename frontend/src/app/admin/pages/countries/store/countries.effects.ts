import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CountriesService} from '../services/countries.service';
import * as countriesActions from './countries.actions';
import {catchError, count, exhaustMap, filter, map, mergeMap, share, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ROUTER_NAVIGATION, RouterNavigatedAction} from '@ngrx/router-store';
import {Store} from '@ngrx/store';
import {CountriesState} from './countries.reducer';
import {getCountriesSelector} from './countries.selector';
import {Countries} from '../model/countries.model';
import { Update } from '@ngrx/entity';
import {AppState} from '../../../../store/app.state';
import {SettingsService} from '../../settings/services/settings.service';
import {UploadService} from '../../../@theme/services/upload.service';


@Injectable()
export class CountriesEffects {



  constructor(private store: Store<AppState>,
              private actions$: Actions,
              private countriesService: CountriesService,
              private uploadService: UploadService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService) {}

  loadCountries$ = createEffect(() => this.actions$.pipe(
    ofType(countriesActions.loadCountries),
    withLatestFrom(this.store.select(getCountriesSelector)),
    switchMap(([action, countries]) => {
      if (!countries.length || countries.length === 1) {
        return this.countriesService.getCountries()
          .pipe(
            map(response => countriesActions.loadCountriesSuccess({countries: response.data})),
            catchError(error => of(countriesActions.loadCountriesFailure({error})))
          );
      }
      return of(countriesActions.dummyCountriesAction());
    })
  ));


  getSingleCountry$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((r: RouterNavigatedAction) => {
      return r.payload.routerState.url.startsWith('/admin/countries/edit');
    }),
    map((r: RouterNavigatedAction) => {
      return r.payload.routerState['params']['id'];
    }),
    withLatestFrom(this.store.select(getCountriesSelector)),
    switchMap(([id, countries]) => {
      if (!countries.length) {
        return this.countriesService.getCountries().pipe(
          map(response => countriesActions.loadCountriesSuccess({countries: response.data}))
        );
      }
      return of(countriesActions.dummyCountriesAction());
    }))
  );

  newCountry$ = createEffect(() => this.actions$.pipe(
    ofType(countriesActions.addCountry),
    mergeMap(action => this.countriesService.newCountry(action.country)
      .pipe(
        map(response => {
          const country = { ...response.data, id: response.data.id};
          this.toaster.success(response.Success);
          return countriesActions.addCountrySuccess({ country });
        }),
        catchError(error => of(countriesActions.addCountryFailure({error})))
      ))
  ));

  updateCountry$ = createEffect(() => this.actions$.pipe(
    ofType(countriesActions.updateCountry),
    mergeMap(action => this.countriesService.updateCountry(action.country.id, action.country)
      .pipe(
        map(response => {
          const updatedCountry: Update<Countries> = {
            id: action.country.id,
            changes: {...response.data}
          };
          this.toaster.success(response.Success);
          return countriesActions.updateCountrySuccess( {country: updatedCountry} );
        }),
        catchError(error => of(countriesActions.updateCountryFailure({error})))
      ))
  ));

  redirectAfterCreateCountrySuccessfully$ = createEffect(() => this.actions$.pipe(
    ofType(...[countriesActions.addCountrySuccess, countriesActions.updateCountrySuccess]),
    tap(() => this.router.navigate(['admin/countries']))
  ), { dispatch: false });


  deleteCountry$ = createEffect(() => this.actions$.pipe(
    ofType(countriesActions.deleteCountry),
    mergeMap(action => this.countriesService.deleteCountry(action.id)
      .pipe(
        map(response => {
          this.toaster.success(response.Success);
          return countriesActions.deleteCountrySuccess({ id: action.id });
        }),
        catchError(error => of(countriesActions.addCountryFailure({error})))
      ))
  ));

  deleteCountryFlag$ = createEffect(() => this.actions$.pipe(
    ofType(countriesActions.deleteCountryFlag),
    mergeMap(action => this.uploadService.resetDropZoneUpload(action.flagUrl, 'logo', 'countries')
      .pipe(
        map(response => {
          this.toaster.success(response.success);
          return countriesActions.deleteCountryFlagSuccess();
        })
      ))
  ), {dispatch: false});

}
