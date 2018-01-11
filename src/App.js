import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import ExperienceList from './ExperienceList/ExperienceList';
import Contact from './Contact/Contact';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1 className="site-title">Clément Bourgoin</h1>
            <nav className="App-navigation">
              <ul>
                <li>
                  <a href="/experiences">Parcours</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </nav>
          </header>
          <ExperienceList/>
          <Contact/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
