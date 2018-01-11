import React from 'react';

import Experience from '../Experience/Experience';

export default class ExperiencePage extends React.Component {
  state = {
    experience: null
  }

  componentDidMount() {
    if (this.state.experience && this.props.match.params.slug === this.state.experience.slug) {
      return;
    }

    this._fetchExperience();
  }

  async _fetchExperience() {
    const response    = await fetch('/data/experiences.json');
    const experiences = await response.json();

    const experience = experiences.experiences.find((experience) => {
      return experience.slug === this.props.match.params.slug;
    });

    this.setState({ experience });
  }

  render() {
    return <Experience {...this.state.experience} />
  }
}
