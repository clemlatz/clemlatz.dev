import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';

export default function Root() {
  // Set default locale to english except if navigator languages contains 'fr'
  const frenchBrowser = navigator.languages.some(lang => lang.includes('fr'));
  const defaultLocale = frenchBrowser ? 'fr' : 'en';

  return (
    <Fragment>
      <Helmet>
        <meta name="prerender-status-code" content="302" />
        <meta
          name="prerender-header"
          content={`Location: /${defaultLocale}/`}
        />
      </Helmet>
      <Redirect to={`/${defaultLocale}/`} />
    </Fragment>
  );
}
