import React from 'react';
import Helmet from 'react-helmet';

import I18n from '../../I18n';
import onSubmit from '../../lib/on-submit';

import './Contact.css';

export default function Contact({ location }) {
  return (
    <div>
      <Helmet>
        <title>
          {`${I18n.getTranslation(location, 'ContactVerb')}`} Clément Bourgoin
        </title>
      </Helmet>
      <form className="Contact" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">
            <I18n t="Your name:" />
          </label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">
            <I18n t="Your email address:" />
          </label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="field">
          <label htmlFor="subject">
            <I18n t="Subject:" />
          </label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="field">
          <label htmlFor="message">
            <I18n t="Message:" />
          </label>
          <textarea id="message" name="message" rows="20" required></textarea>
        </div>
        <div className="field">
          <button className="submit-button" type="submit">
            <I18n t="Submit" />
          </button>
        </div>
      </form>
    </div>
  );
}
