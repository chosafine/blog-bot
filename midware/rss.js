"use strict";

const RSS = require('rss');
const fs = require('fs');
const Posts = require('../models/Post');

// generate RSS feed
const feed = new RSS({
    title: 'Blog',
    description: 'This is a blog',
    feed_url: 'localhost/rss',
    site_url: 'localhost',
    managingEditor: 'user',
    webMaster: 'user',
    copyright: '2018 user',
    language: 'en',
});

// sort posts and generate feed
function generateFeed ( next ) { 
	Posts.find({})
	  .sort({date: -1})
	  .exec( (error, posts) =>{
	    if ( error ) {
	      return next( error );
	    } else {
	      for ( var post in posts ) {
	          feed.item({
	            title:  posts[post].title,
	            description: posts[post].body,
	            date: posts[post].date
	    });
	          }
	    const xml = feed.xml({indent: true}); 

		// write feed to directory
		fs.writeFile("./public/rss/feed.xml", xml, ( error ) => {
		    if ( error ) {
		        return console.error( error );
		    }
		    console.log("RSS Feed Generated!");
		});     
	    }
	  });
}

module.exports.generateFeed = generateFeed;