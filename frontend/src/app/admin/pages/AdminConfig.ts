import {Admin} from './admins/models/admin.model';

export class AdminConfig {
  // An Example | Delete The Content When Started
  // source api
  public static sourceAPI                   = 'http://localhost:8000/admin-api/';

  // All Application Api
  public static loginAPI                    = AdminConfig.sourceAPI + 'login';
  public static registerAPI                 = AdminConfig.sourceAPI + 'register';
  public static sendPasswordResetLinkAPI    = AdminConfig.sourceAPI + 'sendPasswordRequestLink';
  public static resetPasswordAPI            = AdminConfig.sourceAPI + 'changePassword';
  public static logoutAPI                   = AdminConfig.sourceAPI + 'logout';

  // Admins
  public static adminsAPI                   = AdminConfig.sourceAPI + 'admin';

  // Admin Users
  public static usersAPI                    = AdminConfig.sourceAPI + 'user';
  public static userApproveAPI              = AdminConfig.sourceAPI + 'userApprove';

  // Countries
  public static countriesAPI                = AdminConfig.sourceAPI + 'countries';

  // Settings
  public static settingsAPI                 = AdminConfig.sourceAPI + 'settings';
  public static saveSettingsAPI             = AdminConfig.sourceAPI + 'settings/save';

  // Messages
  public static messagesAPI                 = AdminConfig.sourceAPI + 'messages';
  public static messageDirectAPI            = AdminConfig.sourceAPI + 'messageDirect';

  // Upload file
  public static uploadAPI                   = AdminConfig.sourceAPI + 'upload';
  public static resetUploadAPI              = AdminConfig.sourceAPI + 'upload/reset';
}
