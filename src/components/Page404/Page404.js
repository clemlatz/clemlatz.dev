import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import I18n from '../../I18n';
const t = I18n.getTranslation;

export default function Page404({ location }) {
  return (
    <Fragment>
      <Helmet>
        <title>404 · {`${t(location, 'Page not found')}`} ¯\_(ツ)_/¯</title>
        <meta name="prerender-status-code" content="404"></meta>
      </Helmet>
      <strong>404 · {`${t(location, 'Page not found')}`} ¯\_(ツ)_/¯</strong>
    </Fragment>
  );
}
