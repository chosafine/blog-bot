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
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 604800000,
      httpOnly: false,
    },
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

// Setting headers to allow CORS requests so post/get request on client side works
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// define routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// initialize listener for server
app.listen(PORT, () => console.log(`🌎 ==> API server now on port ${PORT}!`));
