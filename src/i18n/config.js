import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

//! =============== 1. Setup & Constants ===============

/**
 * Supported languages configuration
 */
const SUPPORTED_LANGUAGES = ['zh-TW', 'en']
const DEFAULT_LANGUAGE = 'zh-TW'

/**
 * Namespace configuration
 * 💡 Organized by feature area for better code splitting
 */
const NAMESPACES = [
  'common', // Navbar, footer, shared UI
  'home', // Home page
  'about', // About page
  'contact', // Contact page
  'timeline', // Timeline page
  'project', // Project showcase page
  'designToken' // Design token page
]

//! =============== 2. i18n Configuration ===============

i18n
  // Load translations using HTTP backend
  .use(HttpBackend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Fallback language when translation is missing
    fallbackLng: DEFAULT_LANGUAGE,

    // Supported languages
    supportedLngs: SUPPORTED_LANGUAGES,

    // Default namespace
    defaultNS: 'common',

    // Available namespaces
    ns: NAMESPACES,

    // Debug mode (disable in production)
    debug: import.meta.env.DEV,

    // Interpolation configuration
    interpolation: {
      escapeValue: false // React already escapes values
    },

    // Backend configuration for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },

    // Language detection options
    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator'],

      // Cache user language preference
      caches: ['localStorage'],

      // localStorage key
      lookupLocalStorage: 'i18nextLng'
    },

    // React-specific options
    react: {
      // Use Suspense for async loading
      useSuspense: true
    }
  })

export default i18n
