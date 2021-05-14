/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import { config } from '../../../../config';
import { AuthRepository } from '../../ports/auth';

export class AuthService implements AuthRepository {
  SignIn(email: string, password: string): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      if (email === config.mocks.email && password === config.mocks.password) {
        const token = jwt.sign({ email }, config.jwtSecretWord, { algorithm: 'HS256' });
        resolve(token);
      } else {
        reject('User or passwort icorrect');
      }
    });
  }
}
