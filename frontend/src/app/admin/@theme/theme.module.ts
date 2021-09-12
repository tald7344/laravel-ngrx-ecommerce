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
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import {UploadService} from './services/upload.service';
import {AdminConfig} from '../pages/AdminConfig';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: AdminConfig.uploadAPI,
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  createImageThumbnails: true,
  addRemoveLinks: true,
  // Whether the queue will be processed automatically
  autoProcessQueue: true,

  // Optional oject to send additional headers to the server (Default: null)
  // headers: null,

  // How many file uploads to process in parallel (Default: null)
  parallelUploads: 500,

  // Name of the file parameter that gets transferred (Default: 'file')
  // paramName: 'files',

  // Maximum file size for the upload files in megabytes (Default: null)
  // maxFilesize: 500,

  // Comma separated list of mime types or file extensions (Default: null)
  // acceptedFiles: '.jpg, .dcm, .dicom',

  // Whether to send multiple files in one request (Default: null)
  // uploadMultiple: true,

  // Whether thumbnails for images should be generated
  // createImageThumbnails: true,

  // Whether to add a link to every file preview to remove or cancel (if already uploading) the file
  // addRemoveLinks: true
};

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
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    // {
    //   provide: DROPZONE_CONFIG,
    //   useValue: DEFAULT_DROPZONE_CONFIG
    // }
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule
    };
  }
}
