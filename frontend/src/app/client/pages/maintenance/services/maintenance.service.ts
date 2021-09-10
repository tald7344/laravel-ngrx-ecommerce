import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ClientConfig} from '../../ClientConfig';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  
  constructor(private httpClient: HttpClient) {}

  underMaintenance(): Observable<any> {
    return this.httpClient.get<any>(ClientConfig.underMaintenanceAPI);
  }


}
