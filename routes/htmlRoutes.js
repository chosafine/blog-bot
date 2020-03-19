"use_strict";

const path = require("path");
const feed = require("../midware/rss");

module.exports = function(app) {
  app.get("/rss", feed.generateFeed, (req, res, next) => {
    res.sendFile("feed.xml", { root: path.join(__dirname, "../public/rss/") });
  });

  // Send every other request to the React app
  // Define any API routes before this runs
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
};
