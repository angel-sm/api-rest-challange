/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecretWord: process.env.JWT_SECRET_WORD,
  mocks: {
    email: 'demo@usuario.com',
    password: 'pipjY7-guknaq-nancex',
  },
};
