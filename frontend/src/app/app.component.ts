import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { loadUnderMaintenance } from './client/@theme/client-service/maintenance/maintenance.actions';
import { MaintenanceService } from './client/pages/maintenance/services/maintenance.service';
import { getMaintenanceSelector } from './client/@theme/client-service/maintenance/maintenance.selector';
import Echo from 'laravel-echo';
import {environment} from '../environments/environment';
// import * as pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  template: `<router-outlet><router-outlet>`
})
export class AppComponent implements OnInit{

  title = 'EcommerceDTD';
  echo: Echo;


  constructor() {

  }

  ngOnInit(): void {
    // this.publicWebsocketChannel();

  }


  publicWebsocketChannel() {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'bbb0ad75a20064767172',
      cluster: 'mt1',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });

    echo.channel('channel-message')
      .listen('MessageEvent', (data) => {
        console.log('data Is : ', data);
    });

  }

}
