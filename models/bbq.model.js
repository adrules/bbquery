const mongoose = require('mongoose');
const User = require('user.model');

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
    type: String,
    required: 'Menu is required'
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
