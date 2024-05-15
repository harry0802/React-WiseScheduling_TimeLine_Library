import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import zh_TW from "./locales/zh-TW.json";
import vi_VN from "./locales/vi-VN.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      "zh-TW": {
        translation: zh_TW,
      },
      "vi-VN": {
        translation: vi_VN,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
