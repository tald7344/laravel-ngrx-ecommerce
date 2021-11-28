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
  groupMessages: Messages[] = [];
  users: User[] = [];
  authUser = JSON.parse(localStorage.getItem('user')).value.authUser;
  username = this.authUser.name;
  selectedUser: UserAuth;
  messageNotification = new EventEmitter<{ newMessage: boolean, senderId: string, receiveId: string}>();


  constructor(private chatService: ChatService) {
    this.getSocketsId();
  }

  ngOnInit(): void {
    this.joinChat();
    this.getGroupChat();
  }

  getSelectedAuthUser(event) {
    // console.log('user is : ', event);
    // console.log('auth user is : ', this.authUser);
    this.selectedUser = event;
  }

  getSocketsId() {
    this.echo = this.chatService.getSockets();
  }


  joinChat() {
    this.echo.join(`chat`)
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
