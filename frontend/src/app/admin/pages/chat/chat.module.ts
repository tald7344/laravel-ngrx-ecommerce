import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './components/chat/chat.component';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    ThemeModule,
    ChatRoutingModule
  ],
  providers: [] // we will not insert the ChatService in providers to prevent the request to passing throw an AuthTokenInterceptor
})
export class ChatModule { }
