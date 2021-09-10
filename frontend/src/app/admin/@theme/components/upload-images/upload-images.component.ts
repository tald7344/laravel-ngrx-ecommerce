import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {UploadService} from '../../services/upload.service';
import {CountriesService} from '../../../pages/countries/services/countries.service';
import {ToastrService} from 'ngx-toastr';
import {getTokenSelector} from '../../admin-service/store/auth.selector';
import {AdminConfig} from '../../../pages/AdminConfig';
import {AppState} from '../../../../store/app.state';
import {take, takeUntil} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit, AfterViewInit {
  @Input() componentDataEmitter: Observable<any>;  // Ex : CountryDetails, Settings
  @Input() uploadImageClass: string;              // Ex : dropzone-logo-container
  @Input() property: string;                       // Ex : logo, icon, ...
  @Input() uploadType: string;                     // Ex : single | plural
  @Input() storagePath: string;
  @Input() labelTitle: string;
  @Input() isParentSubmitted!: EventEmitter<boolean>;
  @Output() imageUrlEmitter = new EventEmitter<string>();

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  // @ViewChild('DropzoneIconComponent') componentIconRef?: DropzoneComponent;
  // @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  uploadForm: FormGroup;
  componentData: any;
  type = 'component';
  imageUrl: string;
  token: string;
  disabled = false;
  config: DropzoneConfigInterface;
  formSubmit = false;
  dropzone: any;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef,
              private uploadService: UploadService,
              private countriesService: CountriesService,
              private toaster: ToastrService) { }


  ngOnInit(): void {
    // Get The token to use it with dropzone file
    this.store.select(getTokenSelector).subscribe(token => {
      this.token = token;
      this.config = {
        url: AdminConfig.uploadAPI,
        headers : {
          Authorization: 'Bearer ' + token
        },
        params: {
          file_name: this.property,
          path: this.storagePath,
          upload_type: this.uploadType
        },
        clickable: true,
        maxFiles: 1,
        autoReset: null,
        errorReset: null,
        cancelReset: null
      };
    });
    // Subscribe if Form is Submit Or Not
    this.isParentSubmitted.subscribe(submitRes => this.formSubmit = submitRes);
    // Subscribe Until Get ComponentData
    // if (this.componentDataEmitter) {
    //   console.log('component data emitter is exists');
      this.componentDataEmitter.subscribe(res => {
        // debugger;
        console.log('component data emitter is subscribe');
        this.componentData = res;
        this.renderingImage(res);
      });
    // }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('change : ', changes);
  //   // this.dropzone = this.componentRef?.directiveRef?.dropzone();
  // }

  ngAfterViewInit(): void {
    this.dropzone = this.componentRef?.directiveRef?.dropzone();
    // console.log('on Change : ', this.componentRef?.directiveRef?.dropzone());
    // this.renderingImage(this.componentData);
  }

  renderingImage(componentData) {
    // debugger;
    console.log('run rendering image');
    if (componentData) {
      console.log('componentData' , componentData);
      // Set imageUrl To Stored When Loading Page if we want to change the image later
      this.imageUrl = componentData[this.property];
      const imageUrlArray = componentData[this.property]?.split('/');   // [this.storagePath, 'flag_1630503023.png']
      const flagFileName = imageUrlArray ? imageUrlArray[1] : false;
      const mockFile = { name: flagFileName, size: "35315" };
      // debugger;
      // Check IF There is an Image Stored For This Country and the logo Link is contain this.storagePath keyword
      if (imageUrlArray?.includes(this.storagePath)) {
      // debugger;
        // Prevent display image if logoFileName is not fetched or if empty

        const checkDropZone = setInterval(() => {
          // const dropzone = this.componentRef?.directiveRef?.dropzone();
            console.log('checkDropZone', this.dropzone);
      // debugger;
          if (this.dropzone) {
            // TODO Fix image not display in edit-country compoenent
            console.log('DropZone is Exists', this.dropzone);
            if (flagFileName) {
              this.config.clickable = false;  // prevent to upload second image if the image is stored in this.database
              this.dropzone.emit( 'addedfile', mockFile );
              this.dropzone.emit( 'thumbnail', mockFile, componentData.base_url + '/' + componentData[this.property] );
              this.dropzone.emit( 'complete', mockFile);
            }
            console.log('Dropzone exists');
            clearInterval(checkDropZone);
          }
        }, 500);
      }
    }
  }


  public onUploadCanceled(event) {
    console.log('canceled : ', event);
  }


  onRemoveImage() {
    debugger;
    // Make isSubmitted false to prevent execute the automatic onRemoveImage function once submitting the form
    // Prevent display image if imageUrl is not fetched or if empty
    if (this.imageUrl && this.formSubmit == false) {
      this.uploadService.resetDropZoneUpload(this.imageUrl, this.property, this.storagePath, this.componentData?.id).subscribe(
        data => {
          // empty imageUrl that set after upload new file
          this.imageUrl = '';
          // Send ImageUrl To The Parent Component
          this.imageUrlEmitter.emit(this.imageUrl);
          this.disabled = false;
          this.config.clickable = true;
          this.toaster.success(data.success);
          console.log('data : ', data);
        }
      );
    }
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
    this.toaster.error(args[1].error);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    this.imageUrl = args[1];
    debugger;
    this.imageUrlEmitter.emit(this.imageUrl);
    this.disabled = true;
  }

}
