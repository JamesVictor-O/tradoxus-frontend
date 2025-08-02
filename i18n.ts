import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Force initial language to English
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    defaultNS: 'common',
    ns: ['common'],
    
    // Ensure language changes are properly handled
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    console.log('i18n initialized successfully');
    
    // Add language change listener
    i18n.on('languageChanged', (lng) => {
      console.log('Language changed to:', lng);
    });
  })
  .catch((err) => {
    console.error('i18n initialization failed:', err);
  });

export default i18n; 