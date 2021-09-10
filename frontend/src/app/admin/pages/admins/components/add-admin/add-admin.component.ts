import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../models/admin.model';
import * as adminActions from '../../store/admin.actions';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  uploadForm: FormGroup;
  isSubmited = false;

  constructor(private store: Store<Admin>,
              private formBuilder: FormBuilder,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (!this.uploadForm.valid) {
      this.toaster.error('Form not valid, please try again');
      this.isSubmited = false;
      return;
    } else {
      const formObject = this.uploadForm.getRawValue();
      console.log(formObject);
      this.store.dispatch(adminActions.addAdmin({admin: formObject}));
      setTimeout(() => {
        this.isSubmited = false;
      }, 1000);
    }
  }

}
