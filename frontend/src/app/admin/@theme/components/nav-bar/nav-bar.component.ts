import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/admin/pages/register/service/register.service';
import { AuthService } from '../../admin-service/auth/auth.service';
import { TokenService } from '../../admin-service/token/token.service';
import {Store} from '@ngrx/store';
import {startlogout} from '../../admin-service/store/auth.actions';
import {AppState} from '../../../../store/app.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLogouted = false;
  logoutTitle = 'Logout';

  constructor(private store: Store<AppState>, private registerService: RegisterService,
              private tokenService: TokenService,
              private authService: AuthService,
              private toaster: ToastrService,
              private router: Router) { }

  ngOnInit(): void {}


  logout() {
    this.isLogouted = true;
    this.logoutTitle = 'Logout...';
    this.store.dispatch(startlogout());
  }

}
