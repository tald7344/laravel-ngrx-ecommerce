import { NgModule } from '@angular/core';
import {ThemeModule} from '../../@theme/@theme.module';
import { MaintenanceRoutingModule } from './maintenance-routing.module';

import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMaintenance from '../../@theme/client-service/maintenance/maintenance.reducer';


@NgModule({
  declarations: [UnderMaintenanceComponent],
  imports: [
    ThemeModule,
    MaintenanceRoutingModule,
    StoreModule.forFeature(fromMaintenance.maintenanceFeatureKey, fromMaintenance.maintenanceReducer),
    EffectsModule.forFeature()
  ]
})
export class MaintenanceModule { }
