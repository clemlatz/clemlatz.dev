import React from 'react';

import Experience from '../Experience/Experience';

export default class ExperienceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      experiences: null
    }
  }

  componentWillMount() {
    this._fetchExperiences();
  }

  async _fetchExperiences() {
    const response    = await fetch('data/experiences.json');
    const experiences = await response.json();

    this.setState(experiences);
  }

  render() {

    let experiences = null;
    if (this.state.experiences !== null) {
      const sortedExperiences = this.state.experiences.sort((a,b) => {
        return b.startYear - a.startYear;
      });
      experiences = sortedExperiences.map(experience => {
        return <Experience key={experience.id} {...experience} />;
      });
    }

    return (
      <div>
        <h1>Parcours</h1>
        {experiences}
      </div>
    );
  }
}
