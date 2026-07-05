import express from 'express';

import siteRoutes from './routes/sites.js';
import counterRoutes from './routes/counters.js';

import { errorHandler, notFound } from './middleware/errorHandler.js';

import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

app.use(express.json());

app.use(apiLimiter);

app.use('/api/sites', siteRoutes);
app.use('/api/counters', counterRoutes);

app.get('/', (req, res) =>{
    res.send("API running");
});

app.use(notFound);
app.use(errorHandler);


export default app;
