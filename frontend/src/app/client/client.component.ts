import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loadUnderMaintenance } from './@theme/client-service/maintenance/maintenance.actions';
import { getMaintenanceSelector } from './@theme/client-service/maintenance/maintenance.selector';
import { MAIN_MENU_ITEM, ManiMenuItems } from './pages/main-menu';

@Component({
  selector: 'app-client',
  template: `
      <!-- Start Header -->
      <app-header [header_main_menu]="main_menu" *ngIf="!isUnderMaintenance"></app-header>
      <!-- End Header -->
      
      <router-outlet></router-outlet>
      
      <!-- Start Footer -->
      <app-footer *ngIf="!isUnderMaintenance"></app-footer>
      <!-- End Footer -->
  `
})
export class ClientComponent implements OnInit {
  main_menu: ManiMenuItems[];
  isUnderMaintenance: boolean;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    // set menu
    this.main_menu = MAIN_MENU_ITEM;
    this.store.dispatch(loadUnderMaintenance());
    this.getMaintenanceStatus();
  }

  getMaintenanceStatus() {
    this.store.select(getMaintenanceSelector).subscribe(
      maintenanceResponse => {
        if (maintenanceResponse) {
          this.isUnderMaintenance = (maintenanceResponse.status == 'close') ? true : false;
          if (this.isUnderMaintenance) {
            console.log('site is under maintenance');
            this.router.navigate(['/maintenance']);            
          } else {
            console.log('site is working');
            this.router.navigate(['/']);
          }
        }
      }
    );
  }

}
