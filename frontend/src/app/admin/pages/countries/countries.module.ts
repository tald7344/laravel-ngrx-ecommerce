import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { AllCountriesComponent } from './components/all-countries/all-countries.component';
import { NewCountryComponent } from './components/new-country/new-country.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import * as fromCountries from './store/countries.reducer';
import { CountriesEffects } from './store/countries.effects';
import {CountriesService} from './services/countries.service';
import {DropzoneModule} from 'ngx-dropzone-wrapper';


@NgModule({
  declarations: [AllCountriesComponent, NewCountryComponent, EditCountryComponent],
  imports: [
    ThemeModule,
    CountriesRoutingModule,
    StoreModule.forFeature(fromCountries.countriesFeatureKey, fromCountries.reducer),
    EffectsModule.forFeature([CountriesEffects]),
    // DropzoneModule
  ],
  providers: [CountriesService]   // if Not provider the services here the route will not pass into the Interceptor
})
export class CountriesModule { }
