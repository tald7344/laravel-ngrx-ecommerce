import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminConfig} from '../../AdminConfig';
import Echo from 'laravel-echo';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  sendMessage(message: string, socketId: string) {
    // We Insert the Token in header here and not in AuthTokenInterceptor because we want to send 'X-Socket-ID' with headers
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const token = userInfo?.value?.accessToken;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
        'X-Socket-ID': socketId
      })
    };
    return this.httpClient.post(AdminConfig.messagesAPI, {message}, options);
  }

  sendDirectMessage(message: string, authUserId: number, socketId: string) {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const token = userInfo?.value?.accessToken;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
        'X-Socket-ID': socketId
      })
    };
    const data = { message, authUserId };
    return this.httpClient.post(AdminConfig.messageDirectAPI, data, options);
  }

  getSockets(): Echo {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const token = userInfo?.value?.accessToken;
    return new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_key,
      cluster: environment.pusher_cluster,
      // wsHost: window.location.hostname,      // This Can Work
      wsHost: environment.pusher_host,          // This is also Can Work
      authEndpoint: `${environment.urlBase}/admin-api/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      encrypted: false,   // set it to true when use custom SSL certificate
      forceTLS: false,    // it's important to added this line
      wsPort: 6001,
      disableStats: true,
      // enabledTransports: ['ws']  // it's optional
    });
  }
}
