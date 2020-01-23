import React from 'react';
import { NavLink } from 'react-router-i18n';
import I18n from '../../I18n';

import './Header.css';

export default function Header() {
  return (
    <header className="Header">
      <h1 className="title">
        <NavLink ignoreLocale to="/">
          Clément Bourgoin
        </NavLink>
      </h1>
      <p className="tagline">
        <I18n t="Book eater, cat lover, doting father, bedtime storyteller" />
        <br />
        <I18n t="and also" />{' '}
        <strong>
          <I18n t="front-end web developer" />
        </strong>{' '}
        <I18n t="based in Paris" />
      </p>
      <nav className="navigation">
        <ul>
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
        </ul>
      </nav>
    </header>
  );
}
