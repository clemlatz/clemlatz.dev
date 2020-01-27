import React from 'react';
import { NavLink } from 'react-router-dom';

import getCurrentRoute from '../../lib/get-current-route';
import { locales } from '../../I18n';

export default function Footer({ location }) {
  const route = getCurrentRoute(location);
  const links = locales
    .map(locale => (
      <NavLink key={locale} hrefLang={locale} to={`/${locale}/${route}`}>
        {locale}
      </NavLink>
    ))
    .reduce((prev, curr) => [prev, ' · ', curr]);

  return <p>{links}</p>;
}
