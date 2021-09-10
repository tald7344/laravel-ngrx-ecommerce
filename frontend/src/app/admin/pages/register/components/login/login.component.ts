import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RegisterService } from '../../service/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/admin/@theme/admin-service/token/token.service';
import { AuthService } from 'src/app/admin/@theme/admin-service/auth/auth.service';
import { DOCUMENT } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { TokenRespones } from '../../model/token-response';
import { Store } from '@ngrx/store';
import { startLogin } from 'src/app/admin/@theme/admin-service/store/auth.actions';
import {loginFailureSelector} from '../../../../@theme/admin-service/store/auth.selector';
import {ToastrService} from 'ngx-toastr';
import {AppState} from '../../../../../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errors = [];
  error = null;
  process = false;

  constructor(
    private store: Store<AppState>,
    private toaster: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    ) { }

  ngOnInit(): void {
    // get login page style
    this.renderer.addClass(this.document.body, 'login-page');
    // initial reactive form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    // Get Error
    this.store.select(loginFailureSelector).subscribe(
      (error: any) => {
        if (error?.errors) {
          this.errors = error?.errors;
        } else {
          this.error = error;
        }
      }
    );
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.toaster.error('Sorry, Form Not Valid');
      this.process = false;
      return;
    }
    // Form Code
    const formObject = this.loginForm.getRawValue();
    this.store.dispatch(startLogin({data: formObject, email: formObject.email}));
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'login-page');
  }

}
