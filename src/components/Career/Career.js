import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Experience from '../Experience/Experience';
import experiences from '../../data/experiences';

import I18n from '../../I18n';
import resume from '../../data/resume-fr.pdf';

import './Career.css';

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
      <div className="Career">
        <a
          href={resume}
          className="button"
          download={`${I18n.getTranslation(location, 'resume-file-name')}`}
        >
          ⬇ <I18n t="Download PDF resume" />
        </a>
        {experienceList}
      </div>
    </Fragment>
  );
}
