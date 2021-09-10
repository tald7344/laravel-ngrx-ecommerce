import {Countries} from './countries.model';

export interface CountriesResponse {
  Success: string;
  data: Countries[];
}
