"use strict";

const express = require("express");
const path = require("path");
const User = require("../models/User");
const Posts = require("../models/Post");
const mid = require("../midware/middleware");
const feed = require("../midware/rss");

// define routes
module.exports = function(app) {
  app.get("/", (req, res, next) => {
    Posts.find({})
      .sort({ date: -1 })
      .exec((error, posts) => {
        if (error) {
          return next(error);
        } else {
          res.render("index", {
            title: "Blog",
            user: req.session.userId,
            posts: posts
          });
        }
      });
  });

  app.get("/logout", (req, res, next) => {
    if (req.session) {
      req.session.destroy(error => {
        if (error) {
          return next(error);
        } else {
          return res.redirect("/");
        }
      });
    }
  });

  app.get("/login", (req, res) => {
    if (req.session && req.session.userId) {
      return res.redirect("/");
    } else {
      res.render("login", { title: "Login" });
    }
  });

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

  app.get("/register", (req, res) => {
    if (req.session && req.session.userId) {
      return res.redirect("/");
    } else {
      res.render("register", { title: "Register" });
    }
  });

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
        password: req.body.password
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

  app.get("/post", mid.requireLogin, (req, res) => {
    res.render("post", {
      title: "New Post",
      user: req.session.userId
    });
  });

  app.post("/post", mid.requireLogin, (req, res, next) => {
    if (req.body.title && req.body.post) {
      // create object with form input
      const blogPost = {
        title: req.body.title,
        body: req.body.post
      };

      // insert post
      Posts.create(blogPost, error => {
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

  app.get("/edit", mid.requireLogin, (req, res, next) => {
    Posts.find({})
      .sort({ date: -1 })
      .exec((error, posts) => {
        if (error) {
          return next(error);
        } else {
          res.render("edit", {
            title: "Edit Posts",
            user: req.session.userId,
            posts: posts
          });
        }
      });
  });

  app.post("/edit", mid.requireLogin, (req, res, next) => {
    if (req.body.id) {
      Posts.update(
        { _id: req.body.id },
        { $set: { title: req.body.title, body: req.body.post } },
        error => {
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

  app.post("/delete", mid.requireLogin, (req, res, next) => {
    if (req.body.id) {
      Posts.findOneAndDelete({ _id: req.body.id }, error => {
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

  app.get("/about", (req, res) => {
    res.render("about", { title: "About", user: req.session.userId });
  });

  app.get("/rss", feed.generateFeed, (req, res, next) => {
    res.sendFile("feed.xml", { root: path.join(__dirname, "../public/rss/") });
  });
};