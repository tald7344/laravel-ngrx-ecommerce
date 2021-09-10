import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';

import { RegisterService } from '../pages/register/service/register.service';

import { NotFoundComponent } from './components';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainSidebarComponent } from './components/main-sidebar/main-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AuthTokenInterceptor } from './admin-service/auth/auth-token.interceptor';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import {UploadService} from './services/upload.service';

const COMPONENTS = [
  NavBarComponent,
  MainSidebarComponent,
  FooterComponent,
  LoadingSpinnerComponent,
  UploadImagesComponent
];

const MODULES = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  NgxPaginationModule,
  ReactiveFormsModule,
  DataTablesModule,
  DropzoneModule
];

const SERVICES = [
  RegisterService,
  UploadService,
];

@NgModule({
  declarations: [...COMPONENTS, NotFoundComponent ],
  imports: [CommonModule, FormsModule, ...MODULES, RouterModule],
  exports: [...COMPONENTS, ...MODULES],
  providers: [
    ...SERVICES,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule
    };
  }
}
