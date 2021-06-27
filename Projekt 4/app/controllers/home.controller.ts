import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import auth from '../decorators/auth';
import { Controller } from '../types';
import IUser from '../models/User';

class HomeController {
  // @auth()
  index(req: Request, res: Response, next: NextFunction) {
    const viewData: Controller.IViewData = {
      active: {
        home: true,
        about: false,
        contact: false,
      },
      user: req.user as IUser,
    };

    res.render('home', viewData);
  }

  @auth()
  about(req: Request, res: Response, next: NextFunction) {
    const viewData: Controller.IViewData = {
      active: {
        home: false,
        about: true,
        contact: false,
      },
      user: req.user as IUser,
    };

    res.render('about', viewData);
  }

  @auth()
  contact(req: Request, res: Response, next: NextFunction) {
    const viewData: Controller.IViewData = {
      active: {
        home: false,
        about: false,
        contact: true,
      },
      user: req.user as IUser,
    };

    res.render('contact', viewData);
  }
}

export default HomeController;
