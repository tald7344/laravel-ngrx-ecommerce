import {Component, EventEmitter, OnInit} from '@angular/core';
import Echo from 'laravel-echo';
import {environment} from '../../../../../../environments/environment';
import {User} from '../../../users/model/user.model';
import {ChatService} from '../../services/chat.service';
import {Messages} from '../../model/messages.model';
import {UserAuth} from '../../../register/model/user-auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  echo: Echo;
  users: User[] = [];
  inputMessage: string;
  groupMessages: Messages[] = [];
  privateMessages: Messages[] = [];
  authUser = JSON.parse(localStorage.getItem('user')).value.authUser;
  selectedUser: UserAuth;
  messageNotification = new EventEmitter<{ newMessage: boolean, senderId: string, receiveId: string}>();


  constructor(private chatService: ChatService) {
    this.getSocketsId();
  }

  ngOnInit(): void {
    this.joinChat();
    this.getGroupChat();
    this.getPrivateMessage();
  }

  joinChat() {
    this.echo.join(`channel-chat`)
      .here((users) => {
        this.users = users;
        this.users = this.users.filter(user => {
          return user.id !== this.authUser.id;
        });
        console.log('users here : ', this.users);
      })
      .joining((user) => {
        console.log('join : ', user.name, user);
        this.users.push(user);
      })
      .leaving((user) => {
        console.log('Leave : ', user.name, user);
        this.users = this.users.filter(userList => {
          return user.id !== userList.id;
        });
        console.log('new users : ', this.users);
      })
      .error((error) => {
        console.error(error);
      });
  }

  getSelectedAuthUser(event) {
    // console.log('user is : ', event);
    // console.log('auth user is : ', this.authUser);
    this.selectedUser = event;
  }

  getSocketsId() {
    this.echo = this.chatService.getSockets();
  }

  getGroupChat() {
    this.echo.private('channel-chat')
      .listen('ChatEvent', (res) => {
        const message: Messages = {
          message: res.message,
          me: false,
          from: res.from
        };
        this.groupMessages.push(message);
      });
  }

  getPrivateMessage() {
    const userAuthId = this.authUser.id;
    this.echo.private('channel-direct-message.' + userAuthId)
      .listen('ChatDirectMessageEvent', (res) => {
        console.log('private Msg : ', res);
        const messages: Messages = {
          message: res.response.message,
          me: false,
          from: res.response.from.name,
          senderId: res.response.from.id,
          receiveId: res.response.authUserId
        };
        const messageNotification = {
          newMessage: true,
          senderId: res.response.from.id,
          receiveId: res.response.authUserId
        };
        this.privateMessages.push(messages);
        this.messageNotification.emit(messageNotification);
        console.log('Get Private message from chat : ', this.privateMessages);
      });
  }


  sendGroupMessage() {
    const socketId = this.echo.socketId();
    console.log(this.echo.socketId());
    this.chatService.sendMessage(this.inputMessage, socketId).subscribe(data => console.log('subscribe data : ', data));
    const message: Messages = {
      message: this.inputMessage,
      me: true,
      from: 'You'
    };
    this.inputMessage = '';
    this.groupMessages.push(message);
  }


  sendPrivateMessage() {
    const socketId = this.echo.socketId();
    const selectedID = this.selectedUser?.id;
    console.log(this.echo.socketId());
    console.log('selected User :' , this.selectedUser);
    // return;
    this.chatService.sendDirectMessage(this.inputMessage, +selectedID, socketId).subscribe(
      data => console.log('subscribe data : ', data) );
    const message: Messages = {
      message: this.inputMessage,
      me: true,
      from: 'You',
      senderId: this.authUser.id,
      receiveId: selectedID
    };
    this.inputMessage = '';
    this.privateMessages.push(message);
    console.log('Send Private message from chat : ', this.privateMessages);
  }



}
