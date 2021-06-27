import express from 'express';
import flas from 'express-flash';
import morgan from 'morgan';
import coockieParser from 'cookie-parser';
import session from 'express-session';
import chalk from 'chalk';
import config from './config';
import middleware from './middlewares';
import mongoDbConnect from './db/connection';

const start = async () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(coockieParser());
  app.use(
    session({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
    }),
  );

  app.use(flas());
  middleware.passport(app);
  middleware.handlebars(app);
  middleware.routes(app);

  try {
    await mongoDbConnect();
    app.listen(config.port, () => {
      console.log(`server started at http://localhost:${chalk.green(config.port)}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
