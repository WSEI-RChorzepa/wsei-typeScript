import 'reflect-metadata';
import { Request, Response } from 'express';

function auth() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let req = args[0] as Request;
      let res = args[1] as Response;

      if (!req.user) {
        return res.redirect('/signin');
      }

      original.apply(this, args);
    };
  };
}

export default auth;
