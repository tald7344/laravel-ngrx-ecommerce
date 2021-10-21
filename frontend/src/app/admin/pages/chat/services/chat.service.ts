import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Echo from 'laravel-echo';
import {AdminConfig} from '../../AdminConfig';
import {environment} from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token: string;

  constructor(private httpClient: HttpClient) {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    this.token = userInfo?.value?.accessToken;
  }

  getSockets(): Echo {
    return new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_key,
      cluster: environment.pusher_cluster,
      // wsHost: window.location.hostname,      // This Can Work
      wsHost: environment.pusher_host,          // This is also Can Work
      authEndpoint: `${environment.urlBase}/admin-api/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      },
      encrypted: false,   // set it to true when use custom SSL certificate
      forceTLS: false,    // it's important to added this line
      wsPort: 6001,
      disableStats: true,
      // enabledTransports: ['ws']  // it's optional
    });
  }


  sendMessage(message: string, socketId: string) {
    // We Insert the Token in header here and not in AuthTokenInterceptor because we want to send 'X-Socket-ID' with headers
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.token,
        'X-Socket-ID': socketId
      })
    };
    // AdminConfig.messagesAPI : http://localhost:8000/admin-api/messages
    return this.httpClient.post(AdminConfig.messagesAPI, {message}, options);
  }
}
