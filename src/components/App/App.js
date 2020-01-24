import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.css';

import Career from '../Career/Career';
import ExperiencePage from '../ExperiencePage/ExperiencePage';
import Links from '../Links/Links';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Page404 from '../Page404/Page404';
import Root from '../Root/Root';

// Match locales with regular expression containing each locale separated by `|`
const base = '/:locale(en|fr)?';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Helmet>
          <title>Clément Bourgoin</title>
        </Helmet>

        {/* Redirect root url to default locale */}
        <Route path="/" exact component={Root} />

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
      </div>
    </BrowserRouter>
  );
}
