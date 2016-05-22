# Twitter Search App

Isomorphic application for searching through tweets using the Twitter Search API. Implemented using Node and React.

### Running Non-Isomorphic Web Server for Dev

Use webpack's dev-server tool like so:

```
sudo npm install -g webpack-dev-server
webpack-dev-server --progress --colors --port 3000
```

The server will watch files specified in `webpack.config.js`
and .

### Running Isomorphic Web Server in Production

First generate the bundle.js to serve clients:

```
sudo npm install -g webpack
webpack --progress --color -p --config webpack.config.js
```

Then start the web server:

```
npm start
```

You can specify which port the server will listen on using the 
`PORT` environment variable:

```
PORT=3000 npm start
```

### Project Structure

`client/` contains code only run on the client browser. `service/` contains code
only run on the server. `shared/` contains the application's React views and
business logic, and is used on both the client and the server.

Generally, code will only be updated or added in the `shared` directory. The
`client` and `server` directories contain boilerplate code that simply boostraps
the application on both the client and the server.

##### shared/components

Contains all of the React components that make up the web application. Each
component is defined in its own `.jsx` file, which contains a mixture of\
ES6 and JSX code.

Add a new component by creating a new `.jsx` file in this directory and
exporting the component as the default object, like so:

```
import React from 'react';

export default class YourComponent extends React.Component {

  constructor() {
    super();
    this.state = {}; // initial state
  }

  render() {
    return (
      <p>{ this.props.someProperty }</p>
    );
  }

}
```

Then you can import the component like so:

```
import YourComponent from '/path/to/jsx/file';
```

##### shared/services

This contains library functionality that implements the web application's
business logic, for example:

* Database access
* Service calls (e.g. searching and retrieving tweets)
* Complex computations / rules

##### shared/routes.jsx

This file defines the structure of the application. It defines the mapping
between the app's URL paths (e.g. '/', '/about', '/search', etc.) and the
React components that represent the pages at those paths.

To add a new page, simply add another route like so:

```
// routes.jsx

// ... other imports
import YourComponent from '/path/to/jsx/file';

export default (
  <Route name="your-app" path="/" component={App}>
    // .. other routes here

    // your new route
    <Route path="mypage" component={YourComponent} />
  </Route>
);
```

##### client/index.jsx

This bootstraps the React application on the client, so subsequenty user
interaction is handled client-side and the web server is not hit.

It's likely that this file does not need to be modified often, if at all.

##### server/index.jsx

This defines an Express web server that intercepts all requests URLs and
uses the React routes defined in `shared/` to render a page's initial
state on the server.

It also serves static assets from the `assets/` directory, including the
client application's `bundle.js` file.

It's likely that this file does not need to be modified often, if at all.

##### ./index.jsx

Entry point for isomoprhic web server. Imports service logic and starts the
Express web server.

### TODO

- [ ] Split webpack config into DEV and PROD
- [ ] Minify/compress bundle.js in PROD webpack config
- [ ] Prevent multiple search requests firing at the same time
- [ ] Improve `TextEntry` component's real-time state updates
      so it waits until user has finished typing
