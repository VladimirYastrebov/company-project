import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div>
            <button onClick={() => i18n.changeLanguage("rus")}>Русский</button>
            <button onClick={() => i18n.changeLanguage("en")}>English</button>
            <button onClick={() => i18n.changeLanguage("es")}>Español</button>
            <button onClick={() => i18n.changeLanguage("fr")}>Français</button>
        </div>
    );
}
