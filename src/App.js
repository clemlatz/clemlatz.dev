import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import ExperienceList from './ExperienceList/ExperienceList';
import ExperiencePage from './ExperiencePage/ExperiencePage';
import Links from './Links/Links';

class App extends Component {
  _fetchExperiences = async () => {
    const response = await fetch('/data/experiences.json');
    const experiences = await response.json();

    this.props.onExperiencesLoaded(experiences.experiences);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1 className="site-title">
              <NavLink to="/">Clément Bourgoin</NavLink>
            </h1>
            <nav className="App-navigation">
              <ul>
                <li>
                  <NavLink to="/experiences">Parcours</NavLink>
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
          <Route
            path="/experiences"
            exact
            render={() => (
              <ExperienceList fetchExperiences={this._fetchExperiences} />
            )}
          />
          <Route
            path="/experiences/:slug"
            render={() => (
              <ExperiencePage fetchExperiences={this._fetchExperiences} />
            )}
          />
          <Route path="/Links" component={Links} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onExperiencesLoaded: experiences =>
      dispatch({ type: 'ADD_EXPERIENCES', experiences }),
  };
};

export default connect(null, mapDispatchToProps)(App);
