import express from 'express';

import siteRoutes from './routes/sites.js';
import counterRoutes from './routes/counters.js';

const app = express();

app.use(express.json());

app.use('/api/sites', siteRoutes);
app.use('/api/counters', counterRoutes);

app.get('/', (req, res) =>{
    res.send("API running");
})

export default app;
