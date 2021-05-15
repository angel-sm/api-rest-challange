/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const ProtectedSchema = {
  url: Joi
    .string()
    .required(),
};
