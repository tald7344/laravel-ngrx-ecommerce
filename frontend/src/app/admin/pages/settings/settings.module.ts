import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import * as fromSetting from './store/setting.reducer';
import { SettingEffects } from './store/setting.effects';
import { SettingsService } from './services/settings.service';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    ThemeModule,
    SettingsRoutingModule,
    StoreModule.forFeature(fromSetting.settingsFeatureKey, fromSetting.reducer),
    EffectsModule.forFeature([SettingEffects]),
  ],
  providers: [SettingsService],   // if Not provider the services here the route will not pass into the Interceptor
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
