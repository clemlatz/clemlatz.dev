import React from 'react';
import { connect } from 'react-redux';

import Experience from '../Experience/Experience';

class ExperienceList extends React.Component {
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
    if (this.props.experiences !== null) {
      return;
    }

    const response    = await fetch('data/experiences.json');
    const experiences = await response.json();

    this.props.onExperiencesLoaded(experiences.experiences);
  }

  render() {

    let experiences = null;
    if (this.props.experiences !== null) {
      const sortedExperiences = this.props.experiences.sort((a,b) => {
        return b.startYear - a.startYear;
      });
      experiences = sortedExperiences.map(experience => {
        return (
          <Experience key={experience.slug} {...experience} />
        );
      });
    }

    return (
      <div>
        {experiences}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    experiences: state.experiences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onExperiencesLoaded: (experiences) => dispatch({ type: 'ADD_EXPERIENCES', experiences })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceList);

