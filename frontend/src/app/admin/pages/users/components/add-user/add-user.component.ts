import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UserState } from '../../store/user.reducer';
import * as userAction from '../../store/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  uploadForm: FormGroup;
  isSubmited = false;

  constructor(private store: Store<UserState>,
              private formBuilder: FormBuilder,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      level: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  changeLevel(event) {
    this.uploadForm.get('level').setValue(event.target.value, {
      onlySelf: true
    });
  }

  onSubmit() {
    this.isSubmited = true;
    // Check if the form is valid
    if (!this.uploadForm.valid) {
      this.toaster.error('Error : Form Not Valid');
      this.isSubmited = false;
      return;
    } else {
      const formResult = this.uploadForm.getRawValue();
      // Dispatch to create new user
      this.store.dispatch(userAction.addUser({user: formResult}));
      this.isSubmited = false;
    }
  }
}
