import React, { Component } from 'react';
import './App.css';

import ExperienceList from './ExperienceList/ExperienceList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="site-title">Clément Bourgoin</h1>
        <p><a href="https://nokto.net/contact/">contact</a></p>
        <ExperienceList/>
      </div>
    );
  }
}

export default App;
