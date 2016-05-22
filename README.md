# Isomorphic React Web Apps Workshop

### [View Presentation](http://donaldwhyte.github.io/isomorphic-react-workshop)

Talk on how to build isomorphic web apps in React, complete with example code.

## Material

This workshop covers building a web application that allows users to search through tweets using the Twitter Search RESTful API.

All of the code for this example application can be found in the `twitterSearchApp/` directory. Instructions on how to run and deploy that applic

## Running Presentation

You can also run the presentation on a local web server. Clone this
repository and run the presentation like so:

```
npm install
grunt serve
```

The presentation can now be accessed on `localhost:8080`. Note that this web
application is configured to bind to hostname `0.0.0.0`, which means that
once the Grunt server is running, it will be accessible from external hosts 
as well (using the current host's public IP address).
