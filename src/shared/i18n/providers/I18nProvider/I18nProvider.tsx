import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { AppLocalStorage } from 'src/shared/utils/appLocalStorage';
import i18n from 'i18next';
import resources from '../../locales';

const defaultLang = 'en-US';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: defaultLang, // if you're using a language detector, do not define the lng option
    fallbackLng: defaultLang,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

interface II18nProviderContext {
  locale: string;
  updateLocale: (locale: string) => unknown;
}

const I18nProviderContext = React.createContext<II18nProviderContext>({
  locale: navigator.language || defaultLang,
  updateLocale: () => undefined,
});

interface LocaleProviderProps {
  locale?: string;
  children?: React.ReactNode;
}

const I18nProvider: React.FC<LocaleProviderProps> = ({
  locale: initLocale = navigator.language || defaultLang,
  children,
}) => {
  const [locale, setLocale] = useState(
    AppLocalStorage.getItem('APP:LOCALE') || initLocale
  );

  const updateLocale = useCallback((locale: keyof typeof resources) => {
    AppLocalStorage.setItem('APP:LOCALE', locale);
    setLocale(locale);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const providerValue = useMemo(
    () => ({
      locale,
      updateLocale,
    }),
    [locale, updateLocale]
  );

  return (
    <I18nProviderContext.Provider value={providerValue}>
      {children}
    </I18nProviderContext.Provider>
  );
};

export { I18nProviderContext, I18nProvider };
