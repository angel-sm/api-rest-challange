/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const SignInSchema = {
  email: Joi
    .string()
    .required(),
  password: Joi
    .string()
    .required(),
};
