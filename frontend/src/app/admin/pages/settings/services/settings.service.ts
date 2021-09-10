import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/admin/@theme/admin-service/token/token.service';
import { AdminConfig } from '../../AdminConfig';
import { SettingResponse } from '../model/setting-response.model';
import { Setting } from '../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private httpClient: HttpClient) { }

  getSettings(): Observable<SettingResponse> {
    return this.httpClient.get<SettingResponse>(AdminConfig.settingsAPI);
  }

  saveSettings(data: Setting): Observable<any> {
    return this.httpClient.post<any>(AdminConfig.saveSettingsAPI, data);
  }
}
