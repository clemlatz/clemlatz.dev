import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import './App.css';

import I18n from '../../I18n';

import Career from '../Career/Career';
import ExperiencePage from '../ExperiencePage/ExperiencePage';
import Links from '../Links/Links';
import Header from '../Header/Header';

// Set default locale to english except if navigator languages contains 'fr'
const frenchBrowser = navigator.languages.some(lang => lang.includes('fr'));
const defaultLocale = frenchBrowser ? 'fr' : 'en';

// Match locales with regular expression containing each locale separated by `|`
const base = '/:locale(en|fr)?';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Redirect root url to default locale */}
        <Route
          path="/"
          exact
          render={() => <Redirect to={`/${defaultLocale}/`} />}
        />

        {/* Add Header as a catch-all route to inject translations */}
        <Route path={base} component={Header} />

        {/* Routes */}
        <Route
          path={base}
          exact
          render={() => <I18n t="Front-end web developer based in Paris" />}
        />
        <Route path={`${base}/career`} exact component={Career} />
        <Route path={`${base}/career/:slug`} component={ExperiencePage} />
        <Route path={`${base}/links`} exact component={Links} />
      </div>
    </BrowserRouter>
  );
}
