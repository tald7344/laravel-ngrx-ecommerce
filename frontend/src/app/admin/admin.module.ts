import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from './@theme/theme.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    // CommonModule,
    AdminRoutingModule,
    ThemeModule
  ]
})
export class AdminModule { }
