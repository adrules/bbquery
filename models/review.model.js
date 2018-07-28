const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
  userReviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userReviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rate: {
    type: Number,
    min: [1, 'At least 1 star'],
    max: [5, 'Too much stars'],
    required: 'You must give a rate to the user',
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  message: {
    type: String,
    required: 'You must leave a message to the user'
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSquema);

module.exports = Review;
