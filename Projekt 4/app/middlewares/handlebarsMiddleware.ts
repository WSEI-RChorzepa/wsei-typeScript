import path from 'path';
import express, { Express } from 'express';
import exphbs from 'express-handlebars';
import config from '../config';

const hbs = exphbs.create({
  helpers: {
    toJSON: function (value: any) {
      return JSON.stringify(value, null, 2);
    },
    toRoleDescription: function (value: number) {
      switch (value) {
        case 2:
          return 'Uninitialized';
        case 4:
          return 'Consultant';
        case 8:
          return 'Team leader';
        case 16:
          return 'Supervisor';
        case 1024:
          return 'Administrator';
        default:
          return 'Uninitialized';
      }
    },
  },
});

const handlebarsMiddleware = (app: Express) => {
  app.use(express.static(path.join(config.root, 'bundles')));
  app.set('views', path.join(config.root, 'views'));
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
};

export default handlebarsMiddleware;
