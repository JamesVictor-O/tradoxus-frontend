import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslation() {
  const { t, i18n, ready } = useI18nTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return {
    t,
    i18n,
    ready,
    changeLanguage,
    currentLanguage,
  };
} 