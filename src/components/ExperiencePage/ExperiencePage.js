import React from 'react';
import { withRouter } from 'react-router';

import Experience from '../Experience/Experience';

import experiences from '../../data/experiences';

class ExperiencePage extends React.Component {
  render() {
    const experience = experiences.find(experience => {
      return experience.slug === this.props.match.params.slug;
    });

    return <Experience {...experience} />;
  }
}

export default withRouter(ExperiencePage);
