import { NgModule } from '@angular/core';
import { ThemeModule } from './@theme/@theme.module';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    ThemeModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
