import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'dotenv/config';

import { zodMiddleware } from './middlewares';

import { countryRouter } from './routes/country.route';
import { connectRedis } from './client';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
);

app.use(express.json());

app.use('/countries', countryRouter);

app.get('/test', (_req, res) => res.send(200));

app.use(zodMiddleware);

connectRedis().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  }),
);
