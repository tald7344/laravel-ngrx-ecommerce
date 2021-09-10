import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { sendPasswordResetLink } from 'src/app/admin/@theme/admin-service/store/auth.actions';
import { sendPasswordResetLinkErrorSelector } from 'src/app/admin/@theme/admin-service/store/auth.selector';
import { RegisterService } from '../../service/register.service';
import {AppState} from '../../../../../store/app.state';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  errors: [];
  error$: Observable<string>;
  public form = {
    email: null
  };
  process = false;


  constructor(private store: Store<AppState>,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    // check if forget password page to add login-page
    this.renderer.addClass(this.document.body, 'login-page');
    this.error$ = this.store.select(sendPasswordResetLinkErrorSelector);
  }

  onSubmit() {
    console.log(this.form);
    this.store.dispatch(sendPasswordResetLink(this.form));
    this.form.email = null;
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'login-page');
  }

}
