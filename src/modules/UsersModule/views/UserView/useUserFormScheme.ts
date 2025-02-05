import { useI18n } from 'src/shared/i18n';
import * as yup from 'yup';

export interface IUserForm {
  name: string;
  userName: string;
  email: string;
  accessLevel: string;
  picture: string | File;
  tags: number[];
  birthday: string;
}

const useSignInFormScheme = () => {
  const { translate } = useI18n();

  const formScheme = yup
    .object({
      name: yup
        .string()
        .required(translate('app.required'))
        .min(4, translate('app.minLengthOf', { number: 4 })),
      userName: yup
        .string()
        .required(translate('app.required'))
        .min(4, translate('app.required')),
      accessLevel: yup.string().required(translate('app.required')),
      picture: yup.mixed(),
      email: yup
        .string()
        .email(translate('app.wrongEmailFormat'))
        .required(translate('app.required')),
      tags: yup.array(yup.number()).required(translate('app.required')),
      birthday: yup.string().required(translate('app.required')),
    })
    .required();

  return formScheme;
};

export default useSignInFormScheme;
