"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// create schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// hash password before saving to database
UserSchema.pre("save", function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// authenticate input
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email }).exec(function(error, user) {
    if (error) {
      return callback(error);
    } else if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(error, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

// export module
const User = mongoose.model("User", UserSchema);
module.exports = User;
