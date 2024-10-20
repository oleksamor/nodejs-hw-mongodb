import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHadler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(cors());
  app.use(cookieParser());
  app.use(router);
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(notFoundHandler);

  app.use(errorHadler);

  app.get('/', (req, res) => {
    res.send;
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
