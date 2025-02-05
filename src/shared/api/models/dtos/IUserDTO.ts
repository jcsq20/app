import { IAccessLevelDTO } from './IAccessLevelDTO';
import { ITagDTO } from './ITagDTO';

interface IBaseUser {
  id: number;
  name: string;
  userName: string;
  email: string;
  picture: string | File;
  birthday: string;
}

export interface IUserDTO extends IBaseUser {
  accessLevel: IAccessLevelDTO;
  tags: ITagDTO[];
}

export interface ICreateUserDTO extends Omit<IBaseUser, 'id'> {
  accessLevel: IAccessLevelDTO['id'];
  tags: ITagDTO['id'][];
}
