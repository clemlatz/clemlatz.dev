import { createI18n } from 'react-router-i18n';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'fr'];

// Dictionary of translations
const translations = {
  en: {
    'Book eater, cat lover, doting father, bedtime storyteller':
      'Book eater, cat lover, doting father, bedtime storyteller',
    'and also': 'and also',
    'front-end web developer': 'front-end web developer',
    'based in Paris': 'based in Paris',
    HomeMeta:
      'Book eater, cat lover, doting father, bedtime storyteller and also front-end web developer based in Paris',
    Career: 'Career',
    Links: 'Links',
    Today: 'Today',
    at: 'at',
    'Page not found': 'Page not found',
  },
  fr: {
    'Book eater, cat lover, doting father, bedtime storyteller':
      'Dévoreur de livres, amateur de chat, papa poule, conteur du soir',
    'and also': 'mais aussi',
    'front-end web developer': 'développeur web front-end',
    'based in Paris': 'à Paris',
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

export default I18n;
