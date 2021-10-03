import {Component, EventEmitter, OnInit} from '@angular/core';
import Echo from 'laravel-echo';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  echo: Echo;
  inputMessage: string;
  username = 'Rami';


  constructor() {
    this.websocket();
  }

  ngOnInit(): void {
    this.websocketChannelListening();
  }


  websocket() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'as6df655a4sd6f156',
      cluster: 'mt1',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,    // Important Line
      disableStats: true,
    });
  }

  websocketChannelListening() {
    this.echo.channel('chat')
      .listen('ChatEvent', (res) => {
        console.log('Chat Event Data : ', res);
        this.username = res.message;
      });
  }

  sendMessage() {
    console.log('Message : ', this.inputMessage);
  }

}
