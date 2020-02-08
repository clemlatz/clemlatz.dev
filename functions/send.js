const qs = require('querystring');
const validator = require('validator');
const nodemailer = require('nodemailer');

// Get SMTP credentials + contact email from env vars
const { SMTP, CONTACT_EMAIL } = process.env;

// Check that required env vars are defined
if (typeof SMTP === 'undefined' || typeof CONTACT_EMAIL === 'undefined') {
  throw new Error(
    'SMTP and CONTACT_EMAIL environment variables must be defined'
  );
}

// This is our serverless function
// Docs: https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async event => {
  try {
    // If we received a request with anything but POST method, respond with 400
    if (event.httpMethod !== 'POST') {
      return { statusCode: 400, body: '' };
    }

    // We can get the POST body in the event argument passed to this function
    // and parse it with the querystring module to get our form field values
    const { name, email, subject, message } = qs.parse(event.body);

    // User input validation
    try {
      // Check that all fields are filled and are string
      Object.entries({ name, email, subject, message }).forEach(
        ([field, value]) => {
          if (typeof value !== 'string') {
            throw new Error(`${field} is a required field`);
          }

          // Ignore whitespace so that fields with only whitespace are
          // considered empty
          if (validator.isEmpty(value, { ignore_whitespace: true })) {
            throw new Error(`${field} is a required field`);
          }
        }
      );

      // Check that email field value is an email
      if (!validator.isEmail(email)) {
        throw new Error('email must be a valid email address');
      }
    } catch (error) {
      return { statusCode: 522, body: error.message };
    }

    // We use a connection url to pass all credentials at once
    // i.e. smtps://username:password@smtp.example.com/?pool=true
    // Docs: https://nodemailer.com/smtp/
    const mailer = nodemailer.createTransport(SMTP);

    // We pass a message configuration as argument to the sendmail method
    // Docs: https://nodemailer.com/message/
    await mailer.sendMail({
      // The FROM e-mail address must have been authorized in the Mailjet
      // dashboard, so we can't use the sender's real address, but we can
      // use their name here, and print their address in the mail's body
      from: `${name} <${CONTACT_EMAIL}>`,
      // We'll use sender email in the REPLY-TO field though,
      // so we can just hit reply from the mail we'll receive
      replyTo: email,
      to: CONTACT_EMAIL,
      subject,
      // Below is the text of the sent message. It ends by a line including the
      // `DEPLOY_URL` env var that is injected by Netlify so we can keep track
      // of where this was sent from.
      text: `
${message}

---
Sent from ${process.env.DEPLOY_URL}
by ${name} <${email}>`,
    });

    // Everything is OK, respond 200 to our react app
    return { statusCode: 200, body: '' };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
