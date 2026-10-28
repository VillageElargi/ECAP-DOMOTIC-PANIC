import i18n from "i18next";

import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";

import de from "./de.json";
import en from "./en.json";
import fr from "./fr.json";
import it from "./it.json";

const locales = Localization.getLocales();
const languageCode = locales[0]?.languageCode || "fr";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    de: { translation: de },
    it: { translation: it },
  },
  lng: languageCode,
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
