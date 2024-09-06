const nodemailer = require('nodemailer');

// Email SMTP configuration
const { SMTP_CONFIG } = require('../../config/smtp');

/**
 * Method to shoot email
 * @param {*} email
 * @param {*} subject
 * @param {*} html
 * @returns
 */
async function generateEmailService(email, subject, html) {
  try {
    const transporter = nodemailer.createTransport(SMTP_CONFIG);
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      text: '',
      html,
    };

    // sending email and returning response
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('*Error in generating/shooting email* ', err);
    throw error;
  }
}

module.exports = {
  generateEmailService,
};
