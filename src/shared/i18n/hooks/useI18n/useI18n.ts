import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nProviderContext } from '../../providers/I18nProvider/I18nProvider';

const useI18n = () => {
  const i18nProvider = useTranslation();
  const translate = i18nProvider.t;
  const { locale, updateLocale } = useContext(I18nProviderContext);
  const setLocale = (locale: string) => {
    updateLocale(locale);
  };
  return { locale, setLocale, translate, i18nProvider };
};

export default useI18n;
