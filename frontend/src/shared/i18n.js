import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import es from "./locales/es/common.json";
import fr from "./locales/fr/common.json";
import rus from "./locales/rus/common.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
            fr: { translation: fr },
            rus: { translation: rus },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
