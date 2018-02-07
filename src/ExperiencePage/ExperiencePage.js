import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Experience from '../Experience/Experience';

class ExperiencePage extends React.Component {
  componentDidMount() {
    if (this.props.experiences === null) {
      this.props.fetchExperiences();
      return;
    }
  }

  render() {
    if (this.props.experiences === null) {
      return null;
    }

    const experience = this.props.experiences.find((experience) => {
      return experience.slug === this.props.match.params.slug;
    });

    return <Experience {...experience} />
  }
}

const mapStateToProps = state => {
  return {
    experiences: state.experiences
  };
};

export default connect(mapStateToProps)(withRouter(ExperiencePage));

