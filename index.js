import express from 'express';
import cors from 'cors';
import Router from './config/router.js';
import { PORT } from './config/environment.js';
import { connectDb } from './db/helpers.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', Router);

async function startServer() {
  try {
    await connectDb();
    console.log('🤖 Successfully connected to mongodb');
    app.listen(PORT, () => console.log(`🤖 App is listening on port ${PORT}`));
  } catch (err) {
    console.log('ERROR', err);
  }
}

startServer();
