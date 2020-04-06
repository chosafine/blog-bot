const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is our Post model, we use this to posts created by a user.
// Right now it only stores a title and a body, ideally this will
// be expanded to support audio files for podcasts.
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Posts = mongoose.model("Post", postSchema);
module.exports = Posts;
