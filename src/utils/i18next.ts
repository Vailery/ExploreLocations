import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import HttpApi from "i18next-http-backend";

import en from "~/locales/en/translation.json";

void i18n
  .use(initReactI18next)
  .use(Backend)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ru"],
    fallbackLng: "en",
    backend: {
      loadPath: "~/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
