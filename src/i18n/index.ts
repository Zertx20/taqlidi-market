import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './local';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    debug: false,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;