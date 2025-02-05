import { APIModels } from '../../api';

export interface IAppLocalStorage {
  'APP:USER': APIModels.IAuthUserDTO;
  'APP:LOCALE': string;
}
