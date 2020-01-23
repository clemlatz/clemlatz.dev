import React from 'react';
import { NavLink } from 'react-router-i18n';
import I18n from '../I18n';

export default function Header() {
  return (
    <header>
      <h1 className="site-title">
        <NavLink to="/">Clément Bourgoin</NavLink>
      </h1>
      <nav className="App-navigation">
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
