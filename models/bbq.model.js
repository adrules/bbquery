const mongoose = require('mongoose');
const User = require('../models/user.model');

const bbqSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'User is required'
  },
  name: {
    type: String,
    required: 'Name is required'
  },
  date: {
    type: Date,
    required: 'Date is required'
  },
  description: {
    type: String,
    required: 'Description is required' 
  },
  ppp: {
    type: Number,
    required: 'Price per Person is required',
  },
  bread: {
    type: Boolean
  },
  dishes: [{
    name: String,
    ingredients: [{
      name: String,
      amount: Number,
      unit: String,
      price: Number
    }]
  }],
  drinks: [{
    name: String,
    amount: Number,
    unit: String,
    price: Number
  }],
  tags: {
    type: [String]
  },
  photo: {
    type: String
  },
  maxAttendees: {
    type: Number,
    required: 'You must indicate the max number of attendees'
  },
  status: {
    type: String,
    enum: ['scheduled', 'closed', 'done', 'cancelled'],
    default: 'scheduled'
  },
  public: {
    type: Boolean,
    default: true
  },
  dogFriendly: {
    type: Boolean
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, { timestamps: true });

const Bbq = mongoose.model('Bbq', bbqSchema);

module.exports = Bbq;
