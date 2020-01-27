import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Career from '../Career/Career';
import Home from '../Home/Home';
import ExperiencePage from '../ExperiencePage/ExperiencePage';
import Links from '../Links/Links';
import Page404 from '../Page404/Page404';

import { locales } from '../../I18n';

// Match locales with regular expression containing each locale separated by `|`
const base = `/:locale(${locales.join('|')})+`;

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Helmet>
          <title>Clément Bourgoin</title>
        </Helmet>

        {/* Redirect root url to default locale */}
        <Route path="/" exact render={() => <Redirect to={`/en/`} />} />

        {/* Add Header as a catch-all route to inject translations */}
        <Route path={base} component={Header} />

        {/* Routes */}
        <Switch>
          <Route path={base} exact component={Home} />
          <Route path={`${base}/career`} exact component={Career} />
          <Route path={`${base}/career/:slug`} component={ExperiencePage} />
          <Route path={`${base}/links`} exact component={Links} />
          <Route component={Page404} />
        </Switch>

        {/* Add Footer as a catch-all route to inject translations */}
        <Route path={base} component={Footer} />
      </div>
    </BrowserRouter>
  );
}
