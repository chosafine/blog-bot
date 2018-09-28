"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
});

// hash password before saving to database
UserSchema.pre('save', function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, function(error, hash) {
    if (error) {
      return next(error);
    }
    user.password = hash;
    next();
  })
});

// authenticate input
UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email })
      .exec( (error, user) => {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          const error = new Error('User not found.');
          error.status = 401;
          return callback(error);
        }
        bcrypt.compare(password, user.password , (error, result) => {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

// export module
const User = mongoose.model('User', UserSchema);
module.exports = User;