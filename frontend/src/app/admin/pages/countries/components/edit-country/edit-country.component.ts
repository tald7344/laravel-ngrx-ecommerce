import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Admin} from '../../../admins/models/admin.model';
import {select, Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {Update} from '@ngrx/entity';
import * as countriesActions from '../../store/countries.actions';
import {getCountriesErrorSelector, getCountryDetailsSelector} from '../../store/countries.selector';
import {Countries} from '../../model/countries.model';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {Observable, Subject, Subscription} from 'rxjs';
import {CountriesState} from '../../store/countries.reducer';
import {SettingsService} from '../../../settings/services/settings.service';
import {CountriesService} from '../../services/countries.service';
import {getTokenSelector} from '../../../../@theme/admin-service/store/auth.selector';
import {AdminConfig} from '../../../AdminConfig';
import {UploadService} from '../../../../@theme/services/upload.service';
import {Setting} from '../../../settings/model/setting.model';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {
  // @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  // @ViewChild('DropzoneIconComponent') componentIconRef?: DropzoneComponent;
  // @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  uploadForm: FormGroup;
  countryDetailsData: Countries;
  flagUrl: string;
  token: string;
  error$: Observable<string>;
  subscription: Subscription;
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface;
  // isSubmitted = false;

  isSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  countryData: Subject<Countries> = new Subject<Countries>();


  constructor(private store: Store<CountriesState>,
              private formBuilder: FormBuilder,
              private uploadService: UploadService,
              private countriesService: CountriesService,
              private toaster: ToastrService) { }



  ngOnInit(): void {
    // Get The token to use it with dropzone file
    // this.store.select(getTokenSelector).subscribe(token => {
    //   this.token = token;
    //   this.config = {
    //     url: AdminConfig.uploadAPI,
    //     headers : {
    //       Authorization: 'Bearer ' + token
    //     },
    //     params: {
    //       file_name: 'flag',
    //       path: 'countries',
    //       upload_type: 'single'
    //     },
    //     clickable: true,
    //     maxFiles: 1,
    //     autoReset: null,
    //     errorReset: null,
    //     cancelReset: null
    //   };
    // });
    this.initCountryForm();     // Init the form
    this.getCountryDetails();   // get Country Details

    this.error$ = this.store.select(getCountriesErrorSelector);

  }

  getCountryDetails() {
    this.store.select(getCountryDetailsSelector).subscribe(
      countryResponse => {
        if (countryResponse) {
          // debugger;
          this.countryDetailsData = countryResponse;
          this.countryData.next(countryResponse);
          // console.log('Country Response', countryResponse);
          // this.countryDetailsData = countryResponse;
          // Set flagUrl To Stored When Loading Page if we want to change the image later
          // this.flagUrl = countryResponse?.logo;
          // const flagUrlArray = countryResponse?.logo?.split('/');   // ['countries', 'flag_1630503023.png']
          // const flagFileName = flagUrlArray ? flagUrlArray[1] : false;
          // const mockFile = { name: flagFileName, size: "35315" };
          // Check IF There is an Image Stored For This Country and the logo Link is contain 'countries' keyword
          // if (flagUrlArray?.includes('countries')) {
          //   // Prevent display image if logoFileName is not fetched or if empty
          //   const checkDropZone = setInterval(() => {
          //     const dropzone = this.componentRef?.directiveRef?.dropzone();
          //     if (dropzone) {
          //       if (flagFileName) {
          //         this.config.clickable = false;  // prevent to upload second image if the image is stored in countryResponsebase
          //         dropzone.emit( 'addedfile', mockFile );
          //         dropzone.emit( 'thumbnail', mockFile, countryResponse.base_url + '/' + countryResponse.logo );
          //         dropzone.emit( 'complete', mockFile);
          //       }
          //       console.log('Dropzone exists');
          //       clearInterval(checkDropZone);
          //     }
          //   }, 500);
          // }

          this.fillCountryForm(countryResponse);
        }
      }
    );
  }

  initCountryForm() {
    // init the form
    this.uploadForm = this.formBuilder.group({
      countries_name_en: ['', Validators.required],
      countries_name_ar: ['', Validators.required],
      mob: ['', Validators.required],
      code: ['', Validators.required],
      logo: ['']
    });
  }

  fillCountryForm(data: Countries) {
    this.uploadForm.patchValue({
      countries_name_en: data.countries_name_en,
      countries_name_ar: data.countries_name_ar,
      mob: data.mob,
      code: data.countries_name_en,
      logo: data.logo
    });
  }

  onSubmit() {
    this.isSubmitted.emit(true);
    if (!this.uploadForm.valid) {
      this.toaster.error('Sorry, Form Not Valid');
      return;
    }
    const formValue = this.uploadForm.getRawValue();
    formValue.id = this.countryDetailsData.id;
    // if (this.flagUrl) {
    //   formValue.logo = this.flagUrl;
      // empty flagUrl to prevent the automatic onRemoveLogo function from executing it content
    //   this.flagUrl = '';
    // }
    console.log('Submit Form : ', formValue);
    this.store.dispatch(countriesActions.updateCountry({country: formValue}));
  }

  getFlagUrl(event) {
    this.flagUrl = event;
    this.uploadForm.get('logo').setValue(this.flagUrl);
    // debugger;
  }


  // public onUploadCanceled(event) {
  //   console.log('canceled : ', event);
  // }
  //
  // onRemoveFlag() {
  //   // Make isSubmitted false to prevent execute the automatic onRemoveFlag function once submitting the form
  //   // Prevent display image if flagUrl is not fetched or if empty
  //   if (this.flagUrl && this.isSubmitted == false) {
  //     const countryId = this.countryDetailsData.id;
  //     this.uploadService.resetDropZoneUpload(this.flagUrl, 'logo', 'countries', countryId).subscribe(
  //       data => {
  //         // empty flagUrl that set after upload new file
  //         this.flagUrl = '';
  //         // empty the default logo parameter that set after fetch country details data
  //         this.uploadForm.get('logo').setValue('');
  //         this.disabled = false;
  //         this.config.clickable = true;
  //         this.toaster.success(data.success);
  //         console.log('data : ', data);
  //       }
  //     );
  //   }
  // }
  //
  // public onUploadInit(args: any): void {
  //   console.log('onUploadInit:', args);
  // }
  //
  // public onUploadError(args: any): void {
  //   console.log('onUploadError:', args);
  //   this.toaster.error(args[1].error);
  // }
  //
  // public onUploadSuccess(args: any): void {
  //   console.log('onUploadSuccess:', args);
  //   this.flagUrl = args[1];
  //   this.disabled = true;
  // }

}
