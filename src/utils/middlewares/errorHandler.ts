/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response) => {
  res.status(500);
  res.json(err.message);
};
