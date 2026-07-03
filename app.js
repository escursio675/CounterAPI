import express from 'express';

import siteRoutes from './routes/sites.js';

const app = express();

app.use(express.json());

app.use('/api/sites', siteRoutes);

app.get('/', (req, res) =>{
    res.send("API running");
})

export default app;
