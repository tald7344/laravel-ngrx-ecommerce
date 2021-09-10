import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../models/admin.model';
import * as adminActions from '../../store/admin.actions';
import { adminSelector } from '../../store/admin.selector';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  uploadForm: FormGroup;
  admin: Admin;
  adminData: Admin;
  isSubmited = false;
  model: any = {};

  constructor(private store: Store<Admin>,
              private formBuilder: FormBuilder,
              private toaster: ToastrService,) { }

  ngOnInit(): void {


    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['']
    });

    // this.store.dispatch(adminActions.loadAdmin({id: +this.activatedRoute.snapshot.paramMap.get('id')}));
    this.store.pipe(select(adminSelector)).subscribe(
      adminRespones => {
        if (adminRespones) {
          console.log('admin response', adminRespones);
          this.admin = adminRespones;
          this.adminData = adminRespones;
          this.updateFormValues();
        }
      }
    );

  }

  updateFormValues() {
    this.uploadForm.patchValue({
      name: this.adminData.name,
      // email: this.adminData.email,
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (!this.uploadForm.valid) {
      this.toaster.error('Form not valid, please try again');
      this.isSubmited = false;
    } else {
      const formObject = this.uploadForm.getRawValue();
      const update: Update<Admin> = {
        id: this.adminData.id,
        changes: formObject
      };
      console.log(update);
      this.store.dispatch(adminActions.updateAdmin({admin: update}));
      this.isSubmited = false;
    }
  }


}
