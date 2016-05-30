import config from '../config.json';
import Twitter from 'twitter';
import { Router } from 'express';
import bodyParser from 'body-parser';
import { OAuth2 } from 'OAuth';

const debug = require('debug')('twittersearchapi');

// Underlying Twitter logic
function getAuthorisedClient() {
  // Request app-only bearer token and return Twitter client which uses
  // authorised token
  return new Promise(function(resolve, reject) {
    const oauth2 = new OAuth2(
      config.twitter.consumerKey,
      config.twitter.consumerSecret,
      'https://api.twitter.com/',
      null,
      'oauth2/token',
      null
    );

    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
      }, function (e, access_token) {
        if (e) {
          reject({ error: 'Could not get bearer token', details: e });
        } else {
          resolve(new Twitter({
            consumer_key: config.twitter.consumerKey,
            consumer_secret: config.twitter.consumerSecret,
            bearer_token: access_token
          }));
        }
    });
  });
}

function search(query) {
  return new Promise(function(resolve, reject) {
    getAuthorisedClient().then(function(client) {
      const params = { q: query };
      client.get('search/tweets', params, function(error, tweets, response) {
        if (error) {
          reject(error);
        } else {
          // Extract fields this API and the client-side app cares about, and
          // only return those fields
          resolve(processTweets(tweets));
        }
      });
    }, function(err) {
      reject(err);
    })
  });
}

function processTweets(tweets) {
  return tweets.statuses.map(function(t) {
    return {
      author: t.user.name,
      datetime: t.created_at,
      text: t.text,
      link: `https://twitter.com/${t.user.screen_name}/status/${t.id_str}`
    };
  });
}

// API Endpoints
const router = Router();

router.post('/', function(req, res) {
  debug('search/ with', JSON.stringify(req.body));

  const query = req.body.query;
  if (query) {
    search(query).then(function(tweets) {
      res.status(200).json({ tweets: tweets });
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
