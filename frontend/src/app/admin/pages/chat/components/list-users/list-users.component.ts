import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../../users/model/user.model';
import {ChatService} from '../../services/chat.service';
import Echo from 'laravel-echo';
import {ToastrService} from 'ngx-toastr';
import {UserAuth} from '../../../register/model/user-auth';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @Input() usersList: User[] = [];
  @Input() authUser: UserAuth;
  @Output() selectedAuthUser = new EventEmitter<UserAuth>();
  @Input() messageNotification: EventEmitter<any>;
  notifyNewMessage: any;
  userActive = false;

  constructor() { }

  ngOnInit(): void {
    this.messageNotification.subscribe(d => {
      this.notifyNewMessage = d;
      console.log('not : ', d);
    });
  }

  changeToGroupChat() {
    const user: UserAuth = null;
    this.selectedAuthUser.emit(user);
  }

  selectUser(user) {
    if (user.id === this.authUser.id) {
      return;
    }
    if (this.notifyNewMessage) {
      this.notifyNewMessage.newMessage = false;
    }
    this.selectedAuthUser.emit(user);
  }



}
