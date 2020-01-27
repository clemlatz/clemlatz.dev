import React from 'react';
import { Helmet } from 'react-helmet';

import I18n from '../../I18n';

export default function Home({ location }) {
  return (
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
  );
}
