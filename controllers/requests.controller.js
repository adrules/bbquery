const mongoose = require('mongoose');
const Request = require('../models/request.model');

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);
}