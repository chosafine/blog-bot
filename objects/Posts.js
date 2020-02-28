"use strict";

const mongoose = require("mongoose");

// Define the Post Scheme:
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now }
});

const Posts = mongoose.model("Post", postSchema);
module.exports = Posts;
