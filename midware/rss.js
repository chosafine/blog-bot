const RSS = require("rss");
const fs = require("fs");
const Posts = require("../models/Post");

// generate RSS feed
const feed = new RSS({
  title: "blog",
  description: "description",
  feed_url: "http://example.com/rss.xml",
  site_url: "http://example.com",
  image_url: "http://example.com/icon.png",
  docs: "http://example.com/rss/docs.html",
  managingEditor: "user",
  webMaster: "user",
  copyright: "2018 user",
  language: "en",
  categories: ["Category 1", "Category 2", "Category 3"],
  ttl: "60",
});

// sort posts and generate feed
function generateFeed(req, res, next) {
  Posts.find({})
    .sort({ date: -1 })
    .exec((error, posts) => {
      if (error) {
        return next(error);
      } else {
        // grab posts from mongo object
        for (var post in posts) {
          feed.item({
            title: posts[post].title,
            description: posts[post].body,
            guid: posts[post].id,
            date: posts[post].date,
          });

          // generate xml file
          const xml = feed.xml({ indent: true });

          // write feed to directory
          fs.writeFile("./public/rss/feed.xml", xml, (error) => {
            if (error) {
              return console.error(error);
            } else {
              return next();
            }
          });
        }
      }
    });
}

module.exports.generateFeed = generateFeed;
