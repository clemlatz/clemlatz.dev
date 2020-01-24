import React from 'react';
import { Helmet } from 'react-helmet';

import { NavLink } from 'react-router-dom';

import I18n from '../../I18n';

export default function Home({ location }) {
  return (
    <div>
      <Helmet>
        <title>
          Clément Bourgoin ·{' '}
          {`${I18n.getTranslation(location, 'front-end web developer')}`}
        </title>
      </Helmet>
      <p>
        <NavLink to="/en/">en</NavLink> · <NavLink to="/fr/">fr</NavLink>
      </p>
    </div>
  );
}
