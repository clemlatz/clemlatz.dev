import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import I18n from '../../I18n';

export default function Home({ location }) {
  return (
    <Fragment>
      <Helmet>
        <title>
          Clément Bourgoin ·{' '}
          {`${I18n.getTranslation(location, 'front-end web developer')}`}
        </title>
        <meta
          name="description"
          content={`${I18n.getTranslation(location, 'HomeMeta')}`}
        />
      </Helmet>
      <div>
        <p>
          <I18n t="book eater" />
          <br />
          <I18n t="cat lover" />
          <br />
          <I18n t="doting father" />
          <br />
          <I18n t="bedtime storyteller" />
          <br />
          <I18n t="and also" />{' '}
          <strong>
            <I18n t="front-end web developer" />
          </strong>{' '}
          <I18n t="based in Paris" />.<br />
        </p>
        <p>
          <I18n t="Currently" />{' '}
          <strong>
            <I18n t="not" />
          </strong>{' '}
          <I18n t="looking for a job, but let's" />{' '}
          <a
            href="https://www.linkedin.com/in/clement-bourgoin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <I18n t="keep in touch" />
          </a>
          <I18n t="!" />
        </p>
      </div>
    </Fragment>
  );
}
