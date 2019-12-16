import React from 'react';
import { connect } from 'react-redux';

import Experience from '../Experience/Experience';

class ExperienceList extends React.Component {
  componentDidMount() {
    if (this.props.experiences === null) {
      this.props.fetchExperiences();
    }
  }

  render() {
    let experiences = null;
    if (this.props.experiences !== null) {
      experiences = this.props.experiences.map(experience => {
        return <Experience key={experience.slug} {...experience} />;
      });
    }

    return <div>{experiences}</div>;
  }
}

const mapStateToProps = state => {
  return {
    experiences: state.experiences,
  };
};

export default connect(mapStateToProps)(ExperienceList);
