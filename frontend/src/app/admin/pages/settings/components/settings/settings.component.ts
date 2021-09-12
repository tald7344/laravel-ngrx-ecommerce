import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { Setting } from '../../model/setting.model';
import { SettingsState } from '../../store/setting.reducer';
import * as settingsAction from '../../store/setting.actions';
import { getSettingsErrorSelector, getSettingsSelector } from '../../store/setting.selector';
import { SettingsService } from '../../services/settings.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective,  } from 'ngx-dropzone-wrapper';
import { AdminConfig } from '../../../AdminConfig';
import { getTokenSelector } from 'src/app/admin/@theme/admin-service/store/auth.selector';
import {UploadService} from '../../../../@theme/services/upload.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild('DropzoneIconComponent') componentIconRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  uploadForm: FormGroup;
  settings: Setting;
  logoUrl: string;
  iconUrl: string;
  token: string;
  error$: Observable<string>;
  subscription: Subscription;
  public type: string = 'component';


  public disabled: boolean = false;
  public iconDisabled: boolean = false;

  public config: DropzoneConfigInterface;
  public iconConfig: DropzoneConfigInterface;

  // isSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  // settingsData: Subject<Setting> = new Subject<Setting>();


  constructor(private store: Store<SettingsState>,
              private settingService: SettingsService,
              private uploadService: UploadService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    // Dispatch settings
    this.store.dispatch(settingsAction.loadSettings());
    // Get The token to use it with dropzone file
    this.store.select(getTokenSelector).subscribe(token => {
      this.token = token;
      this.config = {
          url: AdminConfig.uploadAPI,
          headers : {
            Authorization: 'Bearer ' + token
          },
          params: {
            file_name: 'logo',
            path: 'settings',
            upload_type: 'single'
          },
          clickable: true,
          maxFiles: 1,
          autoReset: null,
          errorReset: null,
          cancelReset: null
     };
     this.iconConfig = {
        url: AdminConfig.uploadAPI,
        headers : {
          Authorization: 'Bearer ' + token
        },
        params: {
          file_name: 'icon',
          path: 'settings',
          upload_type: 'single'
        },
        clickable: true,
        maxFiles: 1,
        autoReset: null,
        errorReset: null,
        cancelReset: null
      };
    });
    this.initSettingsForm();    // Init the form
    this.getSettings();         // run get settings Method

    this.error$ = this.store.select(getSettingsErrorSelector);

  }

  getSettings() {
    this.subscription = this.store.select(getSettingsSelector).subscribe(
      data => {
        if (data) {
          console.log('data', data);
          this.settings = data;
          // this.settingsData.next(data);
          this.logoUrl = data?.logo;
          this.iconUrl = data?.icon;
          const logoFileName = data?.logo?.split('/')[1];
          const iconFileName = data?.icon?.split('/')[1];
          const dropzone = this.componentRef?.directiveRef?.dropzone();
          const iconDropzone = this.componentIconRef?.directiveRef?.dropzone();
          const mockFile = { name: logoFileName, size: "35315" };
          const iconMockFile = { name: iconFileName, size: "15315" };
          // Prevent display image if logoFileName is not fetched or if empty
          if (dropzone && logoFileName) {
            this.config.clickable = false;  // prevent to upload second image if the image is stored in database
            dropzone.emit( "addedfile", mockFile );
            dropzone.emit( "thumbnail", mockFile, data.base_url + '/' + data.logo );
            dropzone.emit( "complete", mockFile);
          }
          if (iconDropzone && iconFileName) {
            this.iconConfig.clickable = false;  // prevent to upload second image if the image is stored in database
            iconDropzone.emit( "addedfile", iconMockFile );
            iconDropzone.emit( "thumbnail", iconMockFile, data.base_url + '/' + data.icon );
            iconDropzone.emit( "complete", iconMockFile);
          }
          this.fillSettingsForm(data);
        }
    });
  }

  initSettingsForm() {
    // init the form
    this.uploadForm = new FormGroup({
      sitename_ar: new FormControl(''),
      sitename_en: new FormControl(''),
      logo: new FormControl(''),
      icon: new FormControl(''),
      email: new FormControl(''),
      default_lang: new FormControl(''),
      description: new FormControl(''),
      keywords: new FormControl(''),
      status: new FormControl(''),
      message_maintenance: new FormControl(''),
    });
  }

  fillSettingsForm(data: Setting) {
    // debugger;
    this.uploadForm.patchValue({
      sitename_ar: data?.sitename_ar,
      sitename_en: data?.sitename_en,
      logo: data?.logo,
      icon: data?.icon,
      email: data?.email,
      default_lang: data?.default_lang,
      description: data?.description,
      keywords: data?.keywords,
      status: data?.status,
      message_maintenance: data?.message_maintenance,
    });
  }

  changeLang(event) {
    this.uploadForm.patchValue(event.target.value, {
      onlySelf: false
    });
  }

  changeStatus(event) {
    this.uploadForm.patchValue(event.target.value, {
      onlySelf: false
    });
  }

  onSubmit() {
    // this.isSubmitted.emit(true);
    if (!this.uploadForm.valid) {
      this.toaster.error('Sorry, Form Not Valid');
      return;
    }
    const formValue = this.uploadForm.getRawValue();
    // debugger;
    if (this.logoUrl) {
      formValue.logo = this.logoUrl;
      // empty LogoUrl to prevent the automatic onRemoveLogo function from executing it content
      this.logoUrl = '';
      // debugger;
    }
    if (this.iconUrl) {
      formValue.icon = this.iconUrl;
      // empty LogoUrl to prevent the automatic onRemoveIcon function from executing it content
      this.iconUrl = '';
    }
    console.log('Submit Settings Form: ', formValue);
    console.log('Logo URl: ', this.logoUrl);
    console.log('Icon Url: ', this.iconUrl);
    // debugger;
    this.store.dispatch(settingsAction.saveSettings({settings: formValue}));
  }


  // getLogoUrl(event) {
  //   this.logoUrl = event;
  //   this.uploadForm.get('logo').setValue(this.logoUrl);
  //   // debugger;
  // }
  //
  // getIconUrl(event) {
  //   this.iconUrl = event;
  //   this.uploadForm.get('icon').setValue(this.iconUrl);
  //   // debugger;
  // }

  public onUploadCanceled(event) {
    console.log('canceled : ', event);
  }

  public onIconUploadCanceled(event) {
    console.log('Icon canceled : ', event);
  }

  onRemoveLogo() {
    // Prevent display image if logoUrl is not fetched or if empty
    if (this.logoUrl) {
      this.uploadService.resetDropZoneUpload(this.logoUrl, 'logo', 'settings').subscribe(
        data => {
          this.logoUrl = '';
          this.uploadForm.get('logo').setValue(this.logoUrl);
          this.disabled = false;
          this.config.clickable = true;
          this.toaster.success(data.success);
          console.log('data : ', data);
        }
      );
    }
  }

  onRemoveIcon() {
    // Prevent display image if logoUrl is not fetched or if empty
    if (this.iconUrl) {
      this.uploadService.resetDropZoneUpload(this.iconUrl, 'icon', 'settings').subscribe(
        data => {
          this.iconUrl = '';
            this.uploadForm.get('icon').setValue(this.iconUrl);
          this.iconDisabled = false;
          this.iconConfig.clickable = true;
          this.toaster.success(data.success);
          console.log('data : ', data);
        }
      );
    }
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onIconUploadInit(args: any): void {
    console.log('onIconUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onIconUploadError(args: any): void {
    console.log('onIconUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    this.logoUrl = args[1];
    this.disabled = true;
  }

  public onIconUploadSuccess(args: any): void {
    console.log('onIconUploadSuccess:', args);
    this.iconUrl = args[1];
    this.iconDisabled = true;
  }

}
