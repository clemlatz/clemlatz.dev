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
    'web developer': 'web developer',
    'based in Paris': 'based in Paris',
    Currently: 'Currently',
    not: 'not',
    "looking for a job, but let's": "looking for a job, but let's",
    'keep in touch': 'keep in touch',
    '!': '!',
    HomeMeta:
      'Book eater, cat lover, doting father, bedtime storyteller and also web developer based in Paris',
    Career: 'Career',
    Links: 'Links',
    Contact: 'Contact',
    ContactVerb: 'Contact',
    Today: 'Today',
    at: 'at',
    'Page not found': 'Page not found',
    'Download PDF resume': 'Download my PDF resume (french)',
    'resume-file-name': 'clement-bourgoin_front-end-dev_resume.pdf',
    /* Contact form */
    'Your name:': 'Your name:',
    'Your email address:': 'Your email address:',
    'Subject:': 'Subject:',
    'Message:': 'Message:',
    'An error occured:': 'An error occured:',
    'Your message was sent!': 'Your message was sent!',
    Submit: 'Submit',
    'Sending…': 'Sending…',
  },
  fr: {
    'book eater': 'dévoreur de livres',
    'cat lover': 'amateur de chat',
    'doting father': 'papa poule',
    'bedtime storyteller': 'conteur du soir',
    'and also': 'mais aussi',
    'web developer': 'développeur web',
    'based in Paris': 'à Paris',
    Currently: 'Actuellement',
    not: 'pas',
    "looking for a job, but let's": "en recherche d'emploi, mais",
    'keep in touch': 'restons en contact',
    '!': ' !',
    HomeMeta:
      'Dévoreur de livres, amateur de chat, papa poule, conteur du soir mais aussi développeur web à Paris',
    Career: 'Parcours',
    Links: 'Liens',
    Contact: 'Contact',
    ContactVerb: 'Contacter',
    Today: "Aujourd'hui",
    at: 'chez',
    'Page not found': 'Page introuvable',
    'Download PDF resume': 'Télécharger mon CV en PDF',
    'resume-file-name': 'cv_clement-bourgoin_dev-front-end.pdf',
    /* Contact form */
    'Your name:': 'Votre nom :',
    'Your email address:': 'Votre adresse e-mail :',
    'Subject:': 'Sujet: ',
    'Message:': 'Message :',
    'An error occured:': 'Une erreur est survenue :',
    'Your message was sent!': 'Votre message a bien été envoyé !',
    Submit: 'Envoyer',
    'Sending…': 'Envoi…',
  },
};

const I18n = createI18n(locales, translations);

export { locales };
export default I18n;
