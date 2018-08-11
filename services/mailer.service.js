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
  const query = `${process.env.HOST}/users/activate?user=${user._id}&token=${user.token}`;
  const message = `Hi! You are not a robot, are you? If so, click <a href="${query}" target="_blank">here<a> so we can be sure!`;
  transporter.sendMail({
    from: '"BBQuery App" <bbquery.app@gmail.com>',
    to: user.email, 
    subject: "Confirm your account", 
    text: message,
    html: `${message}`
  })
}

module.exports.newRequest = (request, user, bbq, email) => {
  const query = `${process.env.HOST}/requests/accept?id=${request._id}`;
  const message = 
  `Hi! The user <a href="${process.env.HOST}/users/${user._id}" target="_blank"> ${user.firstName} ${user.lastName}</a> wants to join your bbq "${bbq.name}".<br>
  A message to you were attached: "${request.message}"<br>
  <a href="${query}" target="_blank">Click here to accept the request.<a> or ignore this email if you don't want to.`;
  transporter.sendMail({
    from: '"BBQuery App" <bbquery.app@gmail.com>',
    to: email, 
    subject: `${user.firstName} ${user.lastName} wants to join your bbq!`, 
    text: message,
    html: `${message}`
  })
}

module.exports.acceptedRequest = (request, email) => {
  const query = `${process.env.HOST}/requests/pay?id=${request._id}`;
  const message = 
  `Congratulations! You have been accepted to do the <a href="${process.env.HOST}/bbqs/${request.bbq}" target="_blank">BBQ</a> thing.<br>
  <a href="${query}" target="_blank">Click here to pay via Paypal.<a>`;
  transporter.sendMail({
    from: '"BBQuery App" <bbquery.app@gmail.com>',
    to: email, 
    subject: `You were accepted!`, 
    text: message,
    html: `${message}`
  })
}

module.exports.confirmedRequest = (request, email) => {
  const message = `Congratulations! Your Paypal payment has been confirmed, <a href="${process.env.HOST}/bbqs/${request.bbq}" target="_blank">you are ready to go!</a>`;
  transporter.sendMail({
    from: '"BBQuery App" <bbquery.app@gmail.com>',
    to: email, 
    subject: `Your payment was confirmed!`, 
    text: message,
    html: `${message}`
  })
}