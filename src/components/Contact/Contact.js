import React from 'react';
import Helmet from 'react-helmet';

import I18n from '../../I18n';

import './Contact.css';

export default function Links({ location }) {

  return (
    <div>
      <Helmet>
        <title>
          {`${I18n.getTranslation(location, 'ContactVerb')}`} Clément Bourgoin
        </title>
      </Helmet>
      <h1>{`${I18n.getTranslation(location, 'ContactVerb')}`} Clément Bourgoin</h1>
    </div>
  );
}
