import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/admin/@theme/admin-service/auth/auth.service';
import { changePassword } from 'src/app/admin/@theme/admin-service/store/auth.actions';
import { changePasswordErrorSelector } from 'src/app/admin/@theme/admin-service/store/auth.selector';
import { TokenService } from 'src/app/admin/@theme/admin-service/token/token.service';
import { RegisterService } from '../../service/register.service';
import { LoginComponent } from '../login/login.component';
import {AppState} from '../../../../../store/app.state';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  errors: [];
  error = {
    email: null,
    password: null
  };
  public form = {
    email: null,
    password: null,
    password_confirmation: null,	// the name for confirm password must be (password_confirmation)
    resetToken: null
  };
  process = false;

  constructor(private store: Store<AppState>,
              private registerService: RegisterService,
              private tokenService: TokenService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    // check if forget password page to add login-page
    this.renderer.addClass(this.document.body, 'login-page');
    // Get Token From URL
    this.activatedRoute.queryParams.subscribe(
      routeResponse => this.form.resetToken = routeResponse.token
    );
    this.store.select(changePasswordErrorSelector).subscribe(
      (error: any) => {
        debugger;
        if (error?.errors) {
          this.errors = error?.errors;
        }
        if (error?.password) {
          this.error.password = error?.password;
          this.error.email = null;
        } else if (error) {
          this.error.password = null;
          this.error.email = error;
        }
      }
    );
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'login-page');
  }

  // Submit new password
  onSubmit() {
    // this.process = true;
    console.log(this.form);
    this.store.dispatch(changePassword(this.form));
    // this.registerService.changePassword(this.form).subscribe(
    //   response => this.responseHandler(response),
    //   error => this.errorHandler(error)
    // );
  }

  // Handle the response
  responseHandler(response) {
    this.process = false;
    // display success message
    this.toaster.success(response.success);
    // Grouping as login method
    // this.tokenService.handle(this.form.email, response.token.access_token, response.token.expires_in);
    this.authService.changeAuthStatus(true);
    this.router.navigate(['/admin'], {relativeTo: this.activatedRoute});
    document.location.reload();
  }

  errorHandler(error) {
    this.process = false;
    console.log('Error : ', error);
    if (error.error.error) {
      if (error.error.error.password) {
        this.error.password = error.error.error.password;
        this.error.email = null;
      } else if (error.error.error) {
        this.error.password = null;
        this.error.email = error.error.error;
      }
    }
    if (error.error.message) {
      this.error = error.error.message;
    }
    if (error.error.errors) {
      this.errors = error.error.errors;
    }
  }

}
