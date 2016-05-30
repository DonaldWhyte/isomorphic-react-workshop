import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import TweetSearch from './components/twitter/TweetSearch';

export default (
  <Route name="twitter-searcher" path="/" component={App}>
    <IndexRoute path="" component={Home} />
    <Route path="about" component={About} />
    <Route path="search" component={TweetSearch} />
    <Route path="*" component={NotFound} />
  </Route>
);
