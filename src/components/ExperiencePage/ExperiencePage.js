import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import I18n from '../../I18n';
import Experience from '../Experience/Experience';
import experiences from '../../data/experiences';

const t = I18n.getTranslation;

export default withRouter(function ExperiencePage({ location, match }) {
  const { slug, locale } = match.params;

  // Get experience from experiences json file and slug
  const experience = experiences.find((experience) => {
    return experience.slug === slug;
  });

  // Translate job title for page title
  const jobTitle = experience.jobTitle[locale];
  const pageTitle = `${jobTitle} ${t(location, 'at')} ${experience.company}`;

  return (
    <Fragment>
      <Helmet>
        <title>{pageTitle} · Clément Latzarus</title>
      </Helmet>
      <Experience {...experience} />
    </Fragment>
  );
});
