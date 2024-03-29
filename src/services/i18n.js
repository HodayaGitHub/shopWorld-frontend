import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          learn: 'Learn React',
          desc: "hello"
        }
      },
      es: {
        translation: {
          learn: 'Learn React es',
          desc: "Hola"
        }
      }
    }
  })

