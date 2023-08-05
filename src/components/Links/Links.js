import React from 'react';
import Helmet from 'react-helmet';

import I18n from '../../I18n';

import './Links.css';

export default function Links({ location }) {
  const links = {
    Mastodon: 'https://mastodon.social/@clemlatz',
    Github: 'https://github.com/clemlatz',
    'Linked in': 'https://www.linkedin.com/in/clemlatz/',
    Medium: 'https://medium.com/@clemlatz',
    StackOverflow: 'https://stackoverflow.com/users/1053818/clemlatz',
    Twitter: 'https://twitter.com/clemlatz',
  };
  const list = Object.entries(links).map(([title, url]) => (
    <li key={url}>
      <a href={url} rel="me" target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  ));

  return (
    <div>
      <Helmet>
        <title>
          {`${I18n.getTranslation(location, 'Links')}`} · Clément Latzarus
        </title>
      </Helmet>
      <ul className="links">{list}</ul>
    </div>
  );
}
