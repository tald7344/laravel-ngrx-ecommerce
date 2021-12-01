import {Component, Input, OnInit} from '@angular/core';
import {UserAuth} from '../../../register/model/user-auth';
import {Messages} from '../../model/messages';

@Component({
  selector: 'app-chat-body-private',
  templateUrl: './chat-body-private.component.html',
  styleUrls: ['./chat-body-private.component.scss']
})
export class ChatBodyPrivateComponent implements OnInit {
  @Input() selectedUser: UserAuth;
  @Input() authUser: UserAuth;
  @Input() allMessages: Messages[] = [];

  constructor() { }

  ngOnInit(): void {
  }



}
