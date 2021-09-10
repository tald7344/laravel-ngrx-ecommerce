import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthEffects } from './admin/@theme/admin-service/store/auth.effects';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AdminConfig } from './admin/pages/AdminConfig';
import {appReducer} from './store/app.state';
import {CustomSerializer} from './store/router/custom-serializer';
import { MaintenanceEffects } from './client/@theme/client-service/maintenance/maintenance.effects';

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(appReducer,
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        }
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, MaintenanceEffects]),
    // EntityDataModule.forRoot(entityConfig),
    DropzoneModule
  ],
  providers: [
    // RegisterService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
