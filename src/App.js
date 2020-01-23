import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import './App.css';

import ExperienceList from './ExperienceList/ExperienceList';
import ExperiencePage from './ExperiencePage/ExperiencePage';
import Links from './Links/Links';

// Match locales with regular expression containing each locale separated by `|`
const base = '/:locale(en|fr)?';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1 className="site-title">
            <NavLink to={base}>Clément Bourgoin</NavLink>
          </h1>
          <nav className="App-navigation">
            <ul>
              <li>
                <NavLink to={`${base}/experiences`}>Parcours</NavLink>
              </li>
              <li>
                <NavLink to="/links">Liens</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Route
          path="/"
          exact
          render={() => <div>Développeur front-end à Paris</div>}
        />
        <Route path="/experiences" exact component={ExperienceList} />
        <Route path="/experiences/:slug" component={ExperiencePage} />
        <Route path="/Links" component={Links} />
      </div>
    </BrowserRouter>
  );
}
