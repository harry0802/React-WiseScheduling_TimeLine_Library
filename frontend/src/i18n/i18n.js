import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh_TW from './locales/zh-TW.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      "zh-TW": {
        translation: zh_TW
      }
    },
    lng: "zh-TW",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;