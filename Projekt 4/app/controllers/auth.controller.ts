import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import validate from '../decorators/validate';
import SignInSchema from '../validator/signin.validator';
import SignUpSchema from '../validator/signup.validator';
import { Controller } from '../types';
import UserService from '../services/user.service';
import IUser from '../models/User';
import Role from '../models/Role';

class AuthController {
  views = {
    signin(req: Request, res: Response) {
      const configuration: Controller.IViewConfiguration = {
        title: 'Sign In',
        layout: 'auth',
        styles: 'signIn',
      };

      res.render('signin', configuration);
    },
    signup(req: Request, res: Response) {
      const configuration: Controller.IViewConfiguration = {
        title: 'Sign Up',
        layout: 'auth',
        styles: 'signup',
      };

      res.render('signup', configuration);
    },
  };

  @validate(SignInSchema)
  signin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true,
    })(req, res, next);
  }

  signout(req: Request, res: Response) {
    req.logOut();
    res.redirect('/signin');
  }

  @validate(SignUpSchema)
  signup(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
      const data: IUser = {
        firstName,
        lastName,
        contact: {
          email,
          phone,
        },
        active: true,
        role: Role.Uninitialized,
      };

      UserService.create(data, password);
    } catch (error) {}

    req.flash('success', `Account for ${email} was successfuly created.`);
    res.redirect('/signin');
  }
}

export default AuthController;
