import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-root',
  template: `<router-outlet><router-outlet>`
})
export class AppComponent {

  title = 'C4D Dashboard';


  constructor() { }

  ngOnInit(): void {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'as6df655a4sd6f156',
      cluster: 'mt1',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,    // Important Line
      disableStats: true,
    });
    echo.channel('chat')
      .listen('ChatEvent', (res) => {
        console.log('Chat Event Data : ', res);
      });
  }


}
