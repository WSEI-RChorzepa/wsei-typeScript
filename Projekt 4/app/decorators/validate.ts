import 'reflect-metadata';
import { Request, Response } from 'express';
import { AnySchema } from 'yup';

function validate(schema: AnySchema, redirect?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      let req = args[0] as Request;
      let res = args[1] as Response;

      try {
        await schema.validate(req.body, {
          abortEarly: false,
        });
      } catch (error) {
        req.flash('error', error.errors);
        return redirect ? res.redirect(redirect) : res.redirect(req.url);
      }

      original.apply(this, args);
    };
  };
}

export default validate;
