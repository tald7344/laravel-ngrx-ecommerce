import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../store/user.reducer';
import * as userAction from '../../store/user.actions';
import { UserDetailsSelector } from '../../store/user.selector';
import { User } from '../../model/user.model';
import { ToastrService } from 'ngx-toastr';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  uploadForm: FormGroup;
  userId: number;
  userDetails: User;
  userData: User;
  isSubmited = false;


  constructor(private store: Store<UserState>,
              private formBuilder: FormBuilder,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // user id from route
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // instance of our reactive form uploadForm
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      level: ['', Validators.required]
    });
    // Get User Details
    this.getUserDetails();
  }

  // User Details
  getUserDetails() {
    // this.store.dispatch(userAction.loadUser({ id: userId }));
    this.store.pipe(select(UserDetailsSelector)).subscribe(
      userResponse => {
        if (userResponse) {
          console.log('User : ', userResponse);
          this.userDetails = userResponse;
          this.userData = userResponse;
          this.userPatchValue();
        }
      }
    );
  }

  userPatchValue() {
    this.uploadForm.patchValue({
      name: this.userData.name,
      email: this.userData.email,
      level: this.userData.level
    });
  }

  // change user level
  changeLevel(event) {
    this.uploadForm.get('level').setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Submit the form
  onSubmit() {
    this.isSubmited = true;
    if (!this.uploadForm.valid) {
      this.toaster.error('Form Not Valid !');
      this.isSubmited = false;
      return;
    } else {
      const formResult = this.uploadForm.getRawValue();
      // update object
      const update: Update<User> = {
        id: this.userId,
        changes: formResult
      };
      console.log(update);
      this.store.dispatch(userAction.updateUser({user: update}));
      this.isSubmited = false;
    }
  }

}
