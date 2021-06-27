import { Request, Response } from 'express';
import IUser from './models/User';

type Active = {
  [key: string]: Boolean;
};

export namespace Controller {
  export interface IController {
    view: (req: Request, res: Response) => void;
  }

  export interface IViewConfiguration {
    title: string;
    layout: 'main' | 'auth';
    styles: string;
  }

  export interface IViewData {
    active: Active;
    user: IUser;
  }
}
