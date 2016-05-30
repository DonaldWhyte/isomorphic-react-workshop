import React from 'react';
import { Router, browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { render } from 'react-dom';
import routes from '../shared/routes';

render(
  <Router children={routes} history={browserHistory} />,
  document.getElementById('app-view')
);
