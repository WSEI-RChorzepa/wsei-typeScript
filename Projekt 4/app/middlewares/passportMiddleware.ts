import passport from 'passport';
import { Express } from 'express';
import localStrategy from '../auth/passport.local';

localStrategy();

const passportMiddleware = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};

export default passportMiddleware;
