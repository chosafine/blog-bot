const path = require("path");

module.exports = function(app) {
  // Send every other request to the vue.js app
  // essentially if anything but an API route is hit we automatically send
  // the user to the client app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
};
