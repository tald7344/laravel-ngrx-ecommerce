import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminConfig} from '../../AdminConfig';
import {CountriesResponse} from '../model/countries-response';
import {Countries} from '../model/countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<CountriesResponse> {
    return this.httpClient.get<CountriesResponse>(AdminConfig.countriesAPI);
  }

  getCountry(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AdminConfig.countriesAPI}/${id}`);
  }

  newCountry(data: Countries): Observable<any> {
    return this.httpClient.post(AdminConfig.countriesAPI, data);
  }

  updateCountry(id: string, data: Countries): Observable<any> {
    return this.httpClient.put(`${AdminConfig.countriesAPI}/${id}`, data);
  }

  deleteCountry(id: string): Observable<any> {
    return this.httpClient.delete(`${AdminConfig.countriesAPI}/${id}`);
  }

}
