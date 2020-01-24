import React from 'react';
import Helmet from 'react-helmet';

import I18n from '../../I18n';

import './Links.css';

export default function Links({ location }) {
  return (
    <div>
      <Helmet>
        <title>
          {`${I18n.getTranslation(location, 'Links')}`} · Clément Bourgoin
        </title>
      </Helmet>
      <ul className="links">
        <li>
          <a href="https://github.com/iwazaru">Github</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/clement-bourgoin/">Linked In</a>
        </li>
        <li>
          <a href="https://medium.com/@iwazaru">Medium</a>
        </li>
        <li>
          <a href="https://stackoverflow.com/users/1053818/iwazaru">
            StackOverflow
          </a>
        </li>
        <li>
          <a href="https://twitter.com/ClementBourgoin">Twitter</a>
        </li>
      </ul>
    </div>
  );
}
