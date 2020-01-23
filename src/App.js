import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import './App.css';

import I18n from './I18n';

import Career from './Career/Career';
import ExperiencePage from './ExperiencePage/ExperiencePage';
import Links from './Links/Links';
import Header from './Header/Header';

// Match locales with regular expression containing each locale separated by `|`
const base = '/:locale(en|fr)?';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Redirect root url to english by default */}
        <Route path="/" exact render={() => <Redirect to="/en/" />} />

        {/* Add Header as a route to inject translations */}
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
