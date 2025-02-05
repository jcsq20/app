export interface IAuthUserDTO {
  id: number;
  name: string;
  userName: string;
  email: string;
  accessLevel: {
    id: number;
    value: string;
  };
  picture: string;
  auth: {
    token: string;
    refreshToken: string;
  };
}

export type ICreateAuthUserDTO = Omit<IAuthUserDTO, 'auth'>;
