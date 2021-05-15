/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';

export const errorHandler = (error: any, req: Request, res: Response) => {
  res.status(500);
  res.json(error.message);
};
