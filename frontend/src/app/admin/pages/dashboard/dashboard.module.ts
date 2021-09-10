import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    ThemeModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
