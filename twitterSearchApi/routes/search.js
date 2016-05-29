import config from '../config.json';
import Twitter from 'twitter';
import { Router } from 'express';
import bodyParser from 'body-parser';

const debug = require('debug')('twittersearchapi');

// Underlying Twitter logic
const client = new Twitter({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token_key: config.twitter.accessTokenKey,
  access_token_secret: config.twitter.accessTokenSecret
});

function search(query) {
  return new Promise(function(resolve, reject) {
    const params = { q: query };
    client.get('search/tweets', params, function(error, tweets, response) {
      if (error) {
        reject(error);
      } else {
        // TODO: process
        debug(JSON.stringify(tweets));
        resolve(tweets);
      }
    });
  });
}

// API Endpoints
const router = Router();

router.post('/', function(req, res) {
  const query = req.body.query;
  if (query) {
    search(query).then(function(tweets) {
      res.status(200).json(tweets);
    }, function (err) {
      res.status(500).json({
        error: err
      });
    });
  } else {
    res.status(400).json({
      error: "No query specified"
    });
  }
});

export default router;
