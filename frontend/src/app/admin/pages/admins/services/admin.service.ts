import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, throwError } from 'rxjs';
import { catchError, shareReplay, startWith, take } from 'rxjs/operators';
import { TokenService } from 'src/app/admin/@theme/admin-service/token/token.service';
import { AdminConfig } from '../../AdminConfig';
import { AdminResponse } from '../models/admin-response';
import { Admin } from '../models/admin.model';
import { AdminsResponse } from '../models/admins-response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admin$: Observable<AdminsResponse>;

  constructor(private httpClient: HttpClient, 
              private tokenService: TokenService) { }

  private static errorHandle(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  getAdmins(): Observable<AdminsResponse> {
    return this.httpClient.get<AdminsResponse>(
      AdminConfig.adminsAPI
    ).pipe(catchError(AdminService.errorHandle));
    
  }

  getAdmin(adminId: number): Observable<AdminResponse> {
    return this.httpClient.get<AdminResponse>(
      `${AdminConfig.adminsAPI}/${adminId}`
    ).pipe(catchError(AdminService.errorHandle));
  }

  addAdmin(data: any): Observable<AdminResponse> {
    return this.httpClient.post<AdminResponse>(
      AdminConfig.adminsAPI,
      JSON.stringify(data)
    ).pipe(catchError(AdminService.errorHandle));
  }

  updateAdmin(adminId: number, data: any): Observable<any> {
    return this.httpClient.put(
      `${AdminConfig.adminsAPI}/${adminId}`,
      JSON.stringify(data)
    ).pipe(catchError(AdminService.errorHandle));
  }

  deleteAdmin(id: any): Observable<any> {
    return this.httpClient.delete(
      `${AdminConfig.adminsAPI}/${id}`
    );
  }

}
