import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json'
import ro from './locales/ro.json'
import hu from './locales/hu.json'

const savedLanguage = localStorage.getItem('language') || 'hu'


i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        ro: {
            translation: ro,
        },
        hu: {
            translation: hu,
        },

    },
    lng: savedLanguage,
    interpolation: {
        escapeValue: false
    }
})

export default i18next;