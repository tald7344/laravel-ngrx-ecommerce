import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {CountriesState} from '../../store/countries.reducer';
import {CountriesService} from '../../services/countries.service';
import {getCountriesErrorSelector} from '../../store/countries.selector';
import * as countriesActions from '../../store/countries.actions';
import {UploadService} from '../../../../@theme/services/upload.service';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.scss']
})
export class NewCountryComponent implements OnInit {
  uploadForm: FormGroup;
  flagUrl: string;
  error$: Observable<string>;
  isSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private store: Store<CountriesState>,
              private formBuilder: FormBuilder,
              private toaster: ToastrService) { }


  ngOnInit(): void {
    this.initCountryForm();    // Init the form
    this.error$ = this.store.select(getCountriesErrorSelector);
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

  onSubmit() {
    this.isSubmitted.emit(true);
    if (!this.uploadForm.valid) {
      this.toaster.error('Sorry, Form Not Valid');
      return;
    }
    const formValue = this.uploadForm.getRawValue();
    // if (this.flagUrl) {
    //   formValue.logo = this.flagUrl;
      // empty LogoUrl to prevent the automatic onRemoveLogo function from executing it content
    //   this.flagUrl = '';
    // }
    console.log('Submit Country : ', formValue);
    console.log('Flag Url : ', this.flagUrl);
    this.store.dispatch(countriesActions.addCountry({country: formValue}));
  }

  // Get Image Url From Dropzone Child Component
  getImageUrl(event) {
    this.flagUrl = event;
    this.uploadForm.get('logo').setValue(this.flagUrl);
  }

  // public onUploadCanceled(event) {
  //   console.log('canceled : ', event);
  // }

  // onRemoveFlag() {
  //   // Prevent display image if flagUrl is not fetched or if empty
  //   if (this.flagUrl) {
  //     this.uploadService.resetDropZoneUpload(this.flagUrl, 'logo', 'countries').subscribe(
  //       data => {
  //         this.flagUrl = '';
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
