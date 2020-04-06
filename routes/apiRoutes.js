const User = require("../models/User");
const Posts = require("../models/Post");
const mid = require("../midware/middleware");

// exported routes to be used in the app.js file
module.exports = function (app) {
  // This api route exists to grab all posts in the database
  // regardless of user. Think of building the home page of a blog.
  app.get("/all", (req, res, next) => {
    Posts.find({})
      .sort({ date: -1 })
      .exec((error, posts) => {
        if (error) {
          return next(error);
        } else {
          res.json(posts);
        }
      });
  });

  // This route will destroy the session, therefore logging the user out.
  app.get("/logout", (req, res, next) => {
    if (req.session) {
      req.session.destroy((error) => {
        if (error) {
          return next(error);
        } else {
          return res.redirect("/");
        }
      });
    }
  });

  // This route exists to log in the user, we take a username and password sent
  // in the body and then check the database to see if this user exists, if yes
  // then we run it into our authenticate function in the model to authenticate
  // if the password correct, create a session and redirect the user to their=
  // user page.
  app.post("/login", (req, res, next) => {
    // authenticate user
    if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, (error, user) => {
        if (error || !user) {
          const error = new Error("Wrong email or password.");
          error.status = 401;
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect("/post");
        }
      });
    } else {
      const error = new Error("Email and password are required.");
      error.status = 401;
      return next(error);
    }
  });

  // This route exists to register the user, we take an email, username, and password
  // in the body and then check the database to see if this user exists, if yes
  // then we will send an error back to the client saying the user already exists.
  // If not then we will hash the password and create the user, then redirect them
  // to the user page.
  app.post("/register", (req, res, next) => {
    if (req.body.email && req.body.password && req.body.confirmPassword) {
      // confirm that passwords match
      if (req.body.password !== req.body.confirmPassword) {
        const error = new Error("Passwords Do Not Match.");
        error.status = 400;
        return next(error);
      }

      // create object
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };

      // insert into mongo
      User.create(userData, (error, user) => {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect("/post");
        }
      });
    } else {
      const error = new Error("All Fields Required.");
      error.status = 400;
      return next(error);
    }
  });

  // This route exists to take the title and body sent to it and create
  // a new post in the database
  app.post("/post", mid.requireLogin, (req, res, next) => {
    if (req.body.title && req.body.post) {
      // create object with form input
      const blogPost = {
        title: req.body.title,
        body: req.body.post,
      };

      // insert post
      Posts.create(blogPost, (error) => {
        if (error) {
          return next(error);
        } else {
          return res.redirect("/");
        }
      });
    } else {
      const error = new Error("All Fields Required.");
      error.status = 400;
      return next(error);
    }
  });

  // Given the post that the user is editing on the client side, this route
  // will take that post id, go into the database, and change the title
  // and body of said post
  app.post("/edit", mid.requireLogin, (req, res, next) => {
    if (req.body.id) {
      Posts.update(
        { _id: req.body.id },
        { $set: { title: req.body.title, body: req.body.post } },
        (error) => {
          if (error) {
            const error = new Error("There was a problem updating the post.");
            error.status = 500;
            return next(error);
          } else {
            res.redirect("/");
          }
        }
      );
    } else {
      const error = new Error(
        "Post ID does not match the post trying to be updated"
      );
      error.status = 400;
      return next(error);
    }
  });

  // This route takes the id of a post and deletes it from the database
  app.post("/delete", mid.requireLogin, (req, res, next) => {
    if (req.body.id) {
      Posts.findOneAndDelete({ _id: req.body.id }, (error) => {
        if (error) {
          const error = new Error("There was a problem updating the post.");
          error.status = 500;
          return next(error);
        } else {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/");
    }
  });
};
