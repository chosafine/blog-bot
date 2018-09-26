"use strict";

// Requirements for the app to run
const express = require('express');
const mongoose = require('mongoose');
const pug = require('pug');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/route');
const app = express();
const User = require('./objects/User');
const Posts = require('./objects/Posts');
const port = 80;

// Database connector
const mongoDB = 'mongodb://127.0.0.1/blogStore';
mongoose.connect(mongoDB);

//Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'blog test',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
  	mongooseConnection: db
  })
}));

// Setup HTML renderer
app.use(express.static('public'))
app.set('view engine', 'pug');

// Define Routes
app.use('/', routes);
app.use('/logout', routes);
app.use('/login', routes);
app.use('/register', routes);
app.use('/user', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'Error'
  });
});

app.listen(port, () => console.log(`Blog is running on port ${port}!`))