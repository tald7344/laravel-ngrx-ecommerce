import {Component, EventEmitter, OnInit} from '@angular/core';
import Echo from 'laravel-echo';
import {UserAuth} from '../../../register/model/user-auth';
import {User} from '../../../users/model/user.model';
import {ChatService} from '../../services/chat.service';
import {Messages} from '../../model/messages';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  echo: Echo;
  inputMessage: string;
  username = 'Rami';
  groupMessages: Messages[] = [];



  constructor(private chatService: ChatService) {
    this.getSocketsId();
  }

  ngOnInit(): void {
    this.joinChat();
    this.getGroupChat();
  }


  getSocketsId() {
    this.echo = this.chatService.getSockets();
  }


  joinChat() {
    this.echo.join(`chat`)
      .here((users) => {
        console.log('users here : ', users);
      })
      .joining((user) => {
        console.log('join : ', user.name, user);
      })
      .leaving((user) => {
        console.log('Leave : ', user.name, user);
      })
      .error((error) => {
        console.error(error);
      });
  }

  getGroupChat() {
    this.echo.private('chat')
      .listen('ChatEvent', (res) => {
        const message: Messages = {
          message: res.message,
          me: false,
          from: res.from
        };
        this.groupMessages.push(message);
      });
  }


  sendGroupMessage() {
    if (this.inputMessage) {
      const socketId = this.echo.socketId();
      this.chatService.sendMessage(this.inputMessage, socketId).subscribe(data => console.log('subscribe data : ', data));
      const message: Messages = {
        message: this.inputMessage,
        me: true,
        from: 'You'
      };
      this.inputMessage = '';
      this.groupMessages.push(message);
    }
  }



}
