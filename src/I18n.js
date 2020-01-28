import { createI18n } from 'react-router-i18n';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'fr'];

// Dictionary of translations
const translations = {
  en: {
    'book eater': 'book eater',
    'cat lover': 'cat lover',
    'doting father': 'doting father',
    'bedtime storyteller': 'bedtime storyteller',
    'and also': 'and also',
    'front-end web developer': 'front-end web developer',
    'based in Paris': 'based in Paris',
    Currently: 'Currently',
    not: 'not',
    "looking for a job, but let's": "looking for a job, but let's",
    'keep in touch': 'keep in touch',
    '!': '!',
    HomeMeta:
      'Book eater, cat lover, doting father, bedtime storyteller and also front-end web developer based in Paris',
    Career: 'Career',
    Links: 'Links',
    Today: 'Today',
    at: 'at',
    'Page not found': 'Page not found',
  },
  fr: {
    'book eater': 'dévoreur de livres',
    'cat lover': 'amateur de chat',
    'doting father': 'papa poule',
    'bedtime storyteller': 'conteur du soir',
    'and also': 'mais aussi',
    'front-end web developer': 'développeur web front-end',
    'based in Paris': 'à Paris',
    Currently: 'Actuellement',
    not: 'pas',
    "looking for a job, but let's": "en recherche d'emploi, mais",
    'keep in touch': 'restons en contact',
    '!': ' !',
    HomeMeta:
      'Dévoreur de livres, amateur de chat, papa poule, conteur du soir and also front-end web developer based in Paris',
    Career: 'Parcours',
    Links: 'Liens',
    Today: "Aujourd'hui",
    at: 'chez',
    'Page not found': 'Page introuvable',
  },
};

const I18n = createI18n(locales, translations);

export { locales };
export default I18n;
