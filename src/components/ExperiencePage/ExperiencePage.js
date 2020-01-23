import React from 'react';
import { withRouter } from 'react-router';

import Experience from '../Experience/Experience';

import experiences from '../../data/experiences';

export default withRouter(function ExperiencePage(props) {
  const { slug } = props.match.params;
  const experience = experiences.find(experience => {
    return experience.slug === slug;
  });

  return <Experience {...experience} />;
});
