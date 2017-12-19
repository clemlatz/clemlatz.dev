import React, { Component } from 'react';
import './App.css';

import HomePage from './pages/Home';
import SkillsPage from './pages/Skills';

import ExperienceList from './ExperienceList/ExperienceList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isHomePageVisible: true,
      isSkillsPageVisible: false,
      pagesVisibility: {
        home: true,
        skills: false
      },
      displayedPage: 'home',
    }
  }

  displayPage(page) {
    this.hideDisplayedPage();
    const pagesVisibility = this.state.pagesVisibility;
    pagesVisibility[page] = true;
    this.setState({ pagesVisibility: pagesVisibility, displayedPage: page });
  }

  hideDisplayedPage() {
    const displayedPage = this.state.displayedPage;
    const pagesVisibility = this.state.pagesVisibility;
    pagesVisibility[displayedPage] = false;
    this.setState({ pagesVisibility: pagesVisibility });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title" onClick={() => this.displayPage('home')}>Clément Bourgoin</h1>
          <ul className="App-menu">
            <li onClick={() => this.displayPage('skills')}>Compétences</li>
            <li>Expérience</li>
            <li>Projets</li>
            <li>Contact</li>
          </ul>
        </div>
        {this.state.pagesVisibility['home'] && <HomePage />}
        {this.state.pagesVisibility['skills'] && <SkillsPage />}
        <ExperienceList/>
      </div>
    );
  }
}

export default App;
