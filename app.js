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
const User = require('./models/User');
const Posts = require('./models/Post');
const port = 80;

// Database connector
const mongoDB = 'mongodb://127.0.0.1/blogStore';
// note: the next two lines are the way they are due to the current version of mongoose using features that are depreciated in mongodb
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

//Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create session
app.use(session({
  secret: 'blog test',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
  	mongooseConnection: db
  })
}));

// Setup HTML renderer
app.use(express.static('public'));
app.set('view engine', 'pug');


// Define Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var error = new Error('File Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use( (error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    user: req.session.userId,
    message: error.message,
    error: {},
    title: 'Error'
  });
  console.error(error);
});

app.listen(port, () => console.log(`Blog is running on port ${port}!`))