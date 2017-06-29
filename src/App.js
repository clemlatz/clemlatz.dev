import React, { Component } from 'react';
import './App.css';

import SkillsPage from './pages/Skills';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSkillsPageVisible: false
    }
  }

  displaySkillsPage() {
    this.setState({
      isSkillsPageVisible: true
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Clément Bourgoin</h1>
          <ul className="App-menu">
            <li onClick={this.displaySkillsPage.bind(this)}>Compétences</li>
            <li>Expérience</li>
            <li>Projets</li>
            <li>Contact</li>
          </ul>
        </div>
        {this.state.isSkillsPageVisible && <SkillsPage />}
      </div>
    );
  }
}

export default App;
