import {UserAuth} from '../../register/model/user-auth';

export interface Messages {
  message: string;
  me?: boolean;
  from?: string;
  senderId?: string;
  receiveId?: string;
}
