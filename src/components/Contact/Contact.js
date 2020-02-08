import React, { useState } from 'react';
import Helmet from 'react-helmet';

import I18n from '../../I18n';
import onSubmit from '../../lib/on-submit';

import './Contact.css';

export default function Contact({ location }) {
  /*
   We initiate our state, create hooks, and set default values
   - loading (boolean): is the form currently being sent? (default: false)
   - success (boolean): has the form been successfuly sent? (default: false)
   - error (string): contains a message if an error occured (default: null)
 */
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="Contact">
      <Helmet>
        <title>
          {`${I18n.getTranslation(location, 'ContactVerb')}`} Clément Bourgoin
        </title>
      </Helmet>

      {/* If an error message is set, we display it above form */}
      {error && (
        <p className="error">
          <I18n t="An error occured:" />
          {error}
        </p>
      )}

      {/* If success is set to true, we display a success message */}
      {/* Else, we display the form, passing our hooks function to onSubmit */}
      {success ? (
        <p className="success">
          <I18n t="Your message was sent!" />
        </p>
      ) : (
        <form
          onSubmit={event =>
            onSubmit(event, setSuccess, setError, setLoading, location)
          }
        >
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
            {/*
             While the form is being sent, we disable the submit button to
             prevent sending it multiple time if the user clicks again, and
             change the button label to "Sending…"
            */}
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? <I18n t="Sending…" /> : <I18n t="Submit" />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
