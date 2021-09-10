import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllCountriesComponent} from './components/all-countries/all-countries.component';
import {NewCountryComponent} from './components/new-country/new-country.component';
import {EditCountryComponent} from './components/edit-country/edit-country.component';


const routes: Routes = [
  { path: '', component: AllCountriesComponent },
  { path: 'add', component: NewCountryComponent },
  { path: 'edit/:id', component: EditCountryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
