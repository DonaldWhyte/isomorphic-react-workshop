import axios from 'axios';

// TODO: this URL should really be in a config file or environment variable
const API_URL = 'http://127.0.0.1:8080/api/';

// TODO: fix bug when there's only one match, but nothing is returned
function sendTweetApiRequest(reqType, body, resolve, reject) {
  axios.post(API_URL + reqType, body).then(
    function(response) {
      console.log(JSON.stringify(response.data));
      resolve(response.data);
    },
    function(err) {
      console.error(JSON.stringify(err));
      reject(err);
    }
  );
}

export function searchTweets(query) {
  return new Promise(function(resolve, reject) {
    console.log('Searching for tweets which match query:', query);

    if (query === '') {
      resolve([]);
      return;
    }

    sendTweetApiRequest('search', { query: query },
      function(response) {
        console.log(response);
        const tweets = response.tweets || [];
        resolve(tweets);
      },
      function(err) {
        reject(err);
    });
  });
}
