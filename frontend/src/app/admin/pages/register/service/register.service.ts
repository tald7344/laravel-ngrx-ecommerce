import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../model/login-request';
import { AdminConfig } from '../../AdminConfig';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/admin/@theme/admin-service/token/token.service';
import {TokenRespones} from '../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  login(data): Observable<TokenRespones> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post<TokenRespones>(
      AdminConfig.loginAPI,
      JSON.stringify(data),
      httpOptions
      ).pipe(catchError(RegisterService.errorHandler));
  }

  // login(email: string, password: string): Observable<LoginRequest> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   return this.httpClient.post<LoginRequest>(
  //     AdminConfig.loginAPI,
  //     JSON.stringify({email: email, password: password}),
  //     httpOptions
  //     ).pipe(catchError(RegisterService.errorHandler));
  // }

  sendPasswordResetLink(data: any): Observable<{success: string}> {
    return this.httpClient.post<{success: string}>(
      AdminConfig.sendPasswordResetLinkAPI, data
    ).pipe(catchError(RegisterService.errorHandler));
  }

  changePassword(email: string, password: string, password_confirmation: string, resetToken: string): Observable<{success: string, token: TokenRespones}> {
    const data = {
      email,
      password,
      password_confirmation,	// the name for confirm password must be (password_confirmation)
      resetToken
    };
    return this.httpClient.post<{success: string, token: TokenRespones}>(
      AdminConfig.resetPasswordAPI, data,
    ).pipe(catchError(RegisterService.errorHandler));
  }


}
