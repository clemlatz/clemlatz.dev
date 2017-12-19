import React from 'react';

import Experience from '../Experience/Experience';

export default class ExperienceList extends React.Component {
  render() {
    return (
      <div>
        <h1>Expériences</h1>
        <Experience/>
        <Experience/>
        <Experience/>
      </div>
    );
  }
}
