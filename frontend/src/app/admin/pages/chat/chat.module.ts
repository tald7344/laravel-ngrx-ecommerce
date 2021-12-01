import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import {ChatBodyGroupComponent} from './components/chat-body-group/chat-body-group.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {ChatBodyPrivateComponent} from './components/chat-body-private/chat-body-private.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatBodyGroupComponent,
    ListUsersComponent,
    ChatBodyPrivateComponent
  ],
  imports: [
    ThemeModule,
    ChatRoutingModule
  ],
  providers: [] // we will not insert the ChatService in providers to prevent the request to passing throw an AuthTokenInterceptor
})
export class ChatModule { }
