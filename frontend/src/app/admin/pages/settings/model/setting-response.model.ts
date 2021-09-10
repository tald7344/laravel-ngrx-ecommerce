import { Setting } from "./setting.model";

export interface SettingResponse {
    success?: string;
    settings?: Setting;
}