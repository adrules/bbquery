const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bbq: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bbq',
    required: true
  },
  message: {
    type: String,
    required: 'You must attach a message to your bbq request!'
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'cancelled', 'confirmed'],
    default: 'requested'
  }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
