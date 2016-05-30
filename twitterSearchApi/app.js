import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors()); // enable cross-origin requests
app.use(bodyParser.json()); // all requests must have a JSON body

// Top-level API routes
// Note: .default is needed because we're using the ES6 mechanism for module
// management.
app.use('/api/search', require('./routes/search').default);

export default app;
