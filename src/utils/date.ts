import { useTranslation } from "react-i18next";

const LOCALE_MAP: Record<string, string> = {
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  en: "en-GB",
};

export function useFormattedDate() {
  const { i18n } = useTranslation();

  const language = i18n.language.split("-")[0];
  const locale = LOCALE_MAP[language] ?? "fr-FR";

  const now = new Date();

  const targetDate = new Date(now.getFullYear() + 1, 6, 26);

  const date = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(targetDate);

  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  return `${date} - ${time}`;
}
