import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/@theme.module';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    ThemeModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
