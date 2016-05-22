import axios from 'axios';

const API_URL = 'http://100.70.19.227:8080/api/';

function ensureIsArray(arr) {
  if (!arr) {
    return [];
  } else if (arr.constructor !== Array) {
    return [ arr ];
  } else {
    return arr;
  }
}

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

        let ids = ensureIsArray(response.ids);
        resolve(ids);
      },
      function(err) {
        reject(err);
    });
  });
}
