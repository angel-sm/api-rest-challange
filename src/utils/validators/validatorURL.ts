/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

function validatorURL(): any {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { url } = req.body;
      new URL(url);
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

export = {
  validatorURL,
};
