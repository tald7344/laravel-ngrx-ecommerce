import { Component, OnInit } from '@angular/core';
import { SIDEBAR_MENU_ITEM } from './sidebar-menu';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginSuccessSelector } from '../@theme/admin-service/store/auth.selector';
import { autoLogin } from '../@theme/admin-service/store/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { getLoadSpinner } from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'app-pages',
  // template: `
  //   <router-outlet></router-outlet>`
  template: `
  <div class="wrapper">

    <!-- Navbar -->
    <app-nav-bar></app-nav-bar>

    <!-- Main Sidebar Container -->
    <app-main-sidebar [sidebar_menu]="menu"></app-main-sidebar>

    <!-- <div *ngIf="true">

    </div> -->
    <div class="content-wrapper">
      <app-loading-spinner *ngIf="showLoadingIndicator$ | async"></app-loading-spinner>
      <router-outlet *ngIf="!(showLoadingIndicator$ | async)"></router-outlet>
    </div>
    <!-- Footer -->
    <app-footer></app-footer>

  </div>
  `
})
export class PagesComponent implements OnInit {
  menu = SIDEBAR_MENU_ITEM;

  showLoadingIndicator$: Observable<boolean>;		// create variable

  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.showLoadingIndicator$ = this.store.select(getLoadSpinner);
    this.store.dispatch(autoLogin());
    // const runLoadSpinner = setInterval(() => {
    //   this.store.select(getLoadSpinner).subscribe(
    //     data => {
    //       console.log('data', data);
    //       if (data == true) {
    //         clearInterval(runLoadSpinner);
    //       }
    //     }
    //   );
    // }, 1000);

  }

}
