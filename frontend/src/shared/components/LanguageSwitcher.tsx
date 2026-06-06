import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", label: "English" },
    { code: "rus", label: "Русский" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-3 md:justify-end md:px-6">
            {languages.map((language) => {
                const isActive = i18n.resolvedLanguage === language.code;

                return (
                    <button
                        key={language.code}
                        type="button"
                        onClick={() => i18n.changeLanguage(language.code)}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                            isActive
                                ? "border-blue-400 bg-blue-400/15 text-blue-100"
                                : "border-white/15 bg-white/5 text-white/85 hover:border-white/30 hover:bg-white/10"
                        }`}
                        aria-pressed={isActive}
                    >
                        {language.label}
                    </button>
                );
            })}
        </div>
    );
}
