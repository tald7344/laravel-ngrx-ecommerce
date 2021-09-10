import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/admin/@theme/admin-service/token/token.service';
import { AdminConfig } from '../../AdminConfig';
import { UserResponse } from '../model/user-response';
import { UsersResponse } from '../model/users-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }


  // Get All Users
  allUsers(): Observable<UsersResponse> {
    return this.httpClient.get<UsersResponse>(
      AdminConfig.usersAPI,
      // this.tokenService.httpOptions()
    );
  }

  // Get User Details
  UserDetails(userId: number): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(
      `${AdminConfig.usersAPI}/${userId}`,
      // this.tokenService.httpOptions()
    );
  }

  // Add New User
  addUser(data): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      AdminConfig.usersAPI,
      JSON.stringify(data),
      // this.tokenService.httpOptions()
    );
  }

  // Update User
  updateUser(userId: number, value: any): Observable<any> {
    return this.httpClient.put<any>(
      `${AdminConfig.usersAPI}/${userId}`,
      JSON.stringify(value),
      // this.tokenService.httpOptions()
    );
  }

  // Delete New User
  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${AdminConfig.usersAPI}/${userId}`,
      // this.tokenService.httpOptions()
    );
  }

  // Approve User
  approveUser(id: number, approve: number): Observable<any> {
    // const approved = approve ? true : false;
    const data = {id, approve};
    console.log(data);
    return this.httpClient.put(AdminConfig.userApproveAPI, data);
  }



}
