import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {  FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {  NgxPaginationModule } from 'ngx-pagination';
import {  DataTablesModule  } from 'angular-datatables';
import { MaintenanceService } from '../pages/maintenance/services/maintenance.service';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent
];

const MODULES = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  NgxPaginationModule,
  ReactiveFormsModule,
  DataTablesModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, RouterModule],
  exports: [...COMPONENTS, ...MODULES],
  providers: [
    MaintenanceService
  ]
})

export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule
    };
  }
}
