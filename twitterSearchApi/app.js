import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Top-level API routes
// Note: .default is needed because we're using the ES6 mechanism for module
// management.
app.use('/api/search', require('./routes/search').default);

export default app;
