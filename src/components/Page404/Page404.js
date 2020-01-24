import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

export default function Page404() {
  return (
    <Fragment>
      <Helmet>
        <title>404 · Page not found ¯\_(ツ)_/¯</title>
        <meta name="prerender-status-code" content="404"></meta>
      </Helmet>
      <strong>404 · Page not found ¯\_(ツ)_/¯</strong>
    </Fragment>
  );
}
