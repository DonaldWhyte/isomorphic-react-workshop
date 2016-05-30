import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import path from 'path';

import routes from 'routes';

const app = express();

// Define static assets to serve clients.
console.log(path.join(__dirname, 'assets'));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

app.use((req, res) => {
  // Take endpoint the client used and resolve it into react-router location
  const location = createLocation(req.url);

  // Attempt to match location to one of the app's routes. The matched route
  // will be used to render the HTML of the initial page state on the server.
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    // Note that this should never be the case, since our application has a
    // default route that should render a nice-looking 404 page to the client.
    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    // Render initial view of the routes into HTML
    const InitialView = <RouterContext {...renderProps} />;
    const componentHTML = renderToString(InitialView);

    // Inject rendered HTML into a shell document and return that to client
    res.status(200).end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Twitter Search App</title>
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
        </head>
        <body>
          <div id="app-view">${componentHTML}</div>
          <script type="application/javascript" src="/assets/bundle.js"></script>
        </body>
      </html>
    `);
  });
});

export default app;
