const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'Name is required'
  },
  lastName: {
    type: String,
    required: 'Last name is required'
  },
  email: {
    type: String,
    required: 'Email is required',
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
      'Please fill a valid email address'
    ],
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  image: {
    type: String
  },
  age: {
    type: Number,
    required: 'Age is required'
  },
  genre: {
    type: String,
    enum: ['male', 'female', 'non binary']
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(this.password, salt)
      })
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
