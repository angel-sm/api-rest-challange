/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from '@hapi/joi';

function validateSchema(data: any, schema: Schema) {
  const validSchema = Joi.object({
    schema,
  });
  const { error } = validSchema.validate({ schema: data });
  return error;
}

export function validatorSchemaHandler(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const error = validateSchema(req.body, schema);
    error ? next(error.message) : next();
  };
}
