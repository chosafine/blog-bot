"use strict";

// Requirements for the app to run
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const PORT = process.env.PORT || 3001;

// Database connector
const mongoDB = "mongodb://127.0.0.1/blogStore";
// note: the next two lines are the way they are due to the current version of mongoose using features that are depreciated in mongodb
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

//Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Creating express app and configuring middleware needed for authentication
const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// create session
app.use(
  session({
    secret: "blog test",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

// define routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    user: req.session.userId,
    message: error.message,
    error: {},
    title: "Error"
  });
});

app.listen(PORT, () => console.log(`🌎 ==> API server now on port ${PORT}!`));
