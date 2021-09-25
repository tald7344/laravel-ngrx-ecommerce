import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import Echo from 'laravel-echo';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.testWebSocketsConnection();
  }

  testWebSocketsConnection() {
    // const echo = new Echo({
    //   broadcaster: 'pusher',
    //   key: environment.pusher_key,
    //   cluster: environment.pusher_cluster,
    //   wsHost: window.location.hostname,
    //   wsPort: 6001,
    //   forceTLS: false,
    //   disableStats: true,
    // });
    // echo.channel('chat')
    //   .listen('ChatEvent', (res) => {
    //     console.log('Chat Event Data : ', res);
    //   });
  }

}
