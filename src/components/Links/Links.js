import React from 'react';
import Helmet from 'react-helmet';

import I18n from '../../I18n';

import './Links.css';

export default function Links({ location }) {
  const links = {
    Github: 'https://github.com/iwazaru',
    'Linked in': 'https://www.linkedin.com/in/clement-bourgoin/',
    Medium: 'https://medium.com/@iwazaru',
    StackOverflow: 'https://stackoverflow.com/users/1053818/iwazaru',
    Twitter: 'https://twitter.com/ClementBourgoin',
  };
  const list = Object.entries(links).map(([title, url]) => (
    <li key={url}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  ));

  return (
    <div>
      <Helmet>
        <title>
          {`${I18n.getTranslation(location, 'Links')}`} · Clément Bourgoin
        </title>
      </Helmet>
      <ul className="links">{list}</ul>
    </div>
  );
}
