import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Experience from '../Experience/Experience';
import experiences from '../../data/experiences';

import I18n from '../../I18n';

export default function Career({ location }) {
  const experienceList = experiences.map(experience => {
    return <Experience key={experience.slug} {...experience} />;
  });

  return (
    <Fragment>
      <Helmet>
        <title>
          {`${I18n.getTranslation(location, 'Career')}`} · Clément Bourgoin
        </title>
      </Helmet>
      {experienceList}
    </Fragment>
  );
}
