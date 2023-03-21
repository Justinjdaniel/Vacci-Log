import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import __dirname from './dirname.js';

import { errorGenerator, errorHandler } from '#utils/errorHandler.js';
import routes from '#routes/index.js';

const app = express();

app.use([
  logger('dev'),
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  express.static(path.join(__dirname, 'public')),
]);

app.use('/api/v1', routes);

app.use([errorGenerator, errorHandler]);

export default app;
