/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const ProtectedSchema = {
  link: Joi
    .string()
    .required(),
};
