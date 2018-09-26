"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../objects/User');
const Posts = require('../objects/Posts');

// define routes
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Blog', user: req.session.userId });
});

router.get('/logout', (req, res, next) => {
	req.session.destroy( () => {
  });
	return res.redirect('/');
});

router.get('/login', (req, res) => {
	res.render('login', { title: 'Login' });
});

router.post('/login', (req, res, next) => {
	
	// authenticate user
	if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }  else {
        req.session.userId = user._id;
        return res.redirect('/user');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

router.get('/register', (req, res) => {
	res.render('register', { title: 'Register' });
});

router.post('/register', (req, res, next) => {
	if ( req.body.username &&
		 req.body.email &&
		 req.body.password &&
		 req.body.confirmPassword )
		{
			// confirm that passwords match
			if ( req.body.password !== req.body.confirmPassword )
				{ var err = new Error('Passwords Do Not Match.');
				err.status = 400;
				return next(err); }

			// create object with form input
      		const userData = {
        		username: req.body.username,
        		email: req.body.email,
        		password: req.body.password
      		};

			// use schema's `create` method to insert document into Mongo
      		User.create(userData, (error, user) => {
        	if (error) {
         		 return next(error);
        	} else {
          		req.session.userId = user._id;
              return res.redirect('/user');
        	}
			});

		} else {
			var err = new Error('All Fields Required.');
			err.status = 400;
			return next(err);
		}
});

router.get('/user', (req, res, next) => { 
  if (req.session && req.session.userId) {
    return res.render('user', { 
      title: 'New Post', name: User.username, user: req.session.userId 
    });
  } else {
    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
});

router.post('/user', (req, res, next) => {
	if ( req.body.title &&
		 req.body.post )
		{
			// create object with form input
      		const blogPost = {
        		title: req.body.title,
        		body: req.body.post
      		};

			// use schema's `create` method to insert document into Mongo
      		Posts.create(blogPost, (error, user) => {
        	if (error) {
         		 return next(error);
        	} else {
          		return res.redirect('/');
        	}
			});

		} else {
			var err = new Error('All Fields Required.');
			err.status = 400;
			return next(err);
		}
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', user: req.session.userId });
});

module.exports = router;