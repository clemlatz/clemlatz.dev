import React from 'react';
import { NavLink } from 'react-router-i18n';
import Helmet from 'react-helmet';

import I18n, { locales } from '../../I18n';
import getCurrentRoute from '../../lib/get-current-route';

import './Header.css';

export default function Header({ location, match }) {
  // Add alternate languages links to header
  const route = getCurrentRoute(location);
  const alternates = locales.map(locale => (
    <link
      key={locale}
      rel="alternate"
      hrefLang={locale}
      href={`${window.location.origin}/${locale}/${route}`}
    />
  ));

  return (
    <header className="Header">
      <Helmet htmlAttributes={{ lang: match.params.locale }}>
        {alternates}
      </Helmet>
      <h1 className="title">
        <NavLink to="/">Clément Latzarus</NavLink>
      </h1>
      <p className="tagline">
        a.k.a.{' '}
        <a
          href="https://github.com/clemlatz"
          target="_blank"
          rel="noopener noreferrer"
        >
          clemlatz
        </a>{' '}
        · <I18n t="web developer" />
      </p>
      <nav className="navigation">
        <ul>
          <li>
            <a href="https://blog.clemlatz.dev">Blog</a>
          </li>
          <li>
            <NavLink to="/career">
              <I18n t="Career" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/links">
              <I18n t="Links" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <I18n t="Contact" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
