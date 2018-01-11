import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './App.css';

import ExperienceList from './ExperienceList/ExperienceList';
import Contact from './Contact/Contact';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1 className="site-title">
              <Link to="/">Clément Bourgoin</Link>
            </h1>
            <nav className="App-navigation">
              <ul>
                <li>
                  <Link to="/experiences">Parcours</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Route path="/" exact render={() => <div>Bienvenue.</div>} />
          <Route path="/experiences" component={ExperienceList} />
          <Route path="/contact" component={Contact} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
