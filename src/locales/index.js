import { createI18n } from 'vue-i18n'
import fr from './fr.js'
import en from './en.js'

const messages = {
  fr,
  en
}

// Default language detection based on browser or localStorage
const getDefaultLocale = () => {
  // Check if a language is saved in localStorage
  const savedLocale = localStorage.getItem('preferred-language')
  if (savedLocale && messages[savedLocale]) {
    return savedLocale
  }

  // Sinon, utiliser la langue du navigateur
  const browserLocale = navigator.language.split('-')[0]
  if (messages[browserLocale]) {
    return browserLocale
  }

  // Default to French
  return 'fr'
}

const i18n = createI18n({
  legacy: false, // Utiliser la Composition API
  locale: getDefaultLocale(),
  fallbackLocale: 'fr',
  messages
})

export default i18n
