"use-strict";

// give a user access to a page only if they're logged in
function requireLogin(req, res, next) {
  if ( req.session && req.session.userId ) {
    return next();
  } else {
    var error = new Error('You must be logged in to view this page.');
    error.status = 401;
    return next( error );
  }
}

module.exports.requireLogin = requireLogin;
