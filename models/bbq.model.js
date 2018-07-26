const mongoose = require('mongoose');

const bbqSchema = new mongoose.Schema({
  user: {
    type: { type: Schema.Types.ObjectId, ref: 'User' },
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
  menu: {
    courses: [{
      name: String,
      ingredients: [{
        name: String,
        amount: Number,
        unit: String,
        price: Number
      }]
    }],
    bread: Boolean,
    drinks: [{
      name: String,
      amount: Number,
      unit: String,
      price: Number
    }]
  },
  tags: {
    type: [String]
  },
  photos: {
    type: [String]
  },
  maxAttendees: {
    type: Number,
    required: 'You must indicate the max number of attendees'
  },
  status: {
    type: String,
    enum: ['scheduled', 'closed', 'done', 'cancelled']
  },
  public: {
    type: Boolean,
    default: true
  },
  address: {
    type: String,
    required: true
  }

}, { timestamps: true });

const Bbq = mongoose.model('Bbq', bbqSchema);

module.exports = Bbq;
