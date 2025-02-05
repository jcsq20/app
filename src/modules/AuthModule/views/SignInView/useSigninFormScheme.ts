import { useI18n } from 'src/shared/i18n';
import * as yup from 'yup';

export interface ISingInForm {
  userName: string;
  password: string;
  date?: Date;
}

const useSignInFormScheme = () => {
  const { translate } = useI18n();

  const formScheme = yup
    .object({
      userName: yup
        .string()
        .required(translate('app.required'))
        .min(4, translate('app.minLengthOf', { number: 4 })),
      password: yup.string().required(translate('app.required')),
    })
    .required();

  return formScheme;
};

export default useSignInFormScheme;
