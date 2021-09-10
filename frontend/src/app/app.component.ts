import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { loadUnderMaintenance } from './client/@theme/client-service/maintenance/maintenance.actions';
import { MaintenanceService } from './client/pages/maintenance/services/maintenance.service';
import { getMaintenanceSelector } from './client/@theme/client-service/maintenance/maintenance.selector';


@Component({
  selector: 'app-root',
  template: `<router-outlet><router-outlet>`
})
export class AppComponent {

  title = 'C4D Dashboard';
  

  constructor() { }

  ngOnInit(): void {
  }

}
