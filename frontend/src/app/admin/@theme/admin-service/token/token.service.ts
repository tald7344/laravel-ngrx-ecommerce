import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminConfig } from 'src/app/admin/pages/AdminConfig';
import { User } from 'src/app/admin/pages/register/model/user';
import { HelperService } from '../../services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: AdminConfig.loginAPI,
  };

  constructor() {
  }

  /* OLD HANDLE WAY :
    // // expire_time : in Seconds
    // handle(email, token, expireTime) {
    //   console.log('Expire Time To Delete Your Token is : ', HelperService.convertSecondsToHMS(expireTime));
    //   // this.iss.email = email;
    //   // this.setToken(token);
    //   const expire_time_millseconds = expireTime * 1000;
    //   this.setTokenWithExpiry("token", token, expire_time_millseconds);
    // }
  */

  // expire_time : in Seconds
  handle(user: User) {
    console.log('Expire Time To Delete Your Token is : ', HelperService.convertSecondsToHMS(user.getExpireIn));
    // this.iss.email = email;
    // this.setToken(token);
    const expire_time_millseconds = user.getExpireIn * 1000;
    this.setTokenWithExpiry("user", user, expire_time_millseconds);
  }

    // Delete The Token From The Cookie
  deleteToken() {
    // localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isValid() {
    // const token = this.getTokenWithExpiry('token');
    const user = this.getTokenWithExpiry('user');
    if (user) {
      // debugger;
      const payload = this.payload(user?.accessToken);
      return (Object.values(this.iss).indexOf(payload.login) > -1 || user?.accessToken != '') ? true : false;
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  // decode the token to fetch the data from it
  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

  setTokenWithExpiry(key, value, ttl) {
    const now = new Date();
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }


  getTokenWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }


  httpOptions() {
    const user = this.getTokenWithExpiry('user');
    console.log('token : ', user.token);
    if (user) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + user.token
       })
      }
    }
  }
}
