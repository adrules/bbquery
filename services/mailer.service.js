const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const defaultFrom = process.env.EMAIL_SENDER
const message = "Hi! You are not a robot, are you? If so, click here please so we can be sure!"

module.exports.confirmSignUp = (user) => {
  const query = `http://localhost:3000/users/activate?user=${user._id}&token=${user.token}`;
  const message = `Hi! You are not a robot, are you? If so, click <a href="${query}" target="_blank">here<a> so we can be sure!`;
  transporter.sendMail({
    from: '"BBQuery App" <bbquery.app@gmail.com>',
    to: user.email, 
    subject: "Confirm your account", 
    text: message,
    html: `${message}`
  })
}