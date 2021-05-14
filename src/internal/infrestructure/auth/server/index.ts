/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Application, Request, Response } from 'express';
import { AuthService } from '../../../core/services/auth/service';
import { validatorSchemaHandler } from '../../../../utils/validators/validatorSchema';
import { SignInSchema } from '../../../core/domain/singIn';

export const AuthServer = (app: Application, router: any) => {
  const service = new AuthService();

  app.use('/', router);

  router.post('/login', validatorSchemaHandler(SignInSchema), (req: Request, res: Response) => {
    const { email, password } = req.body;

    service.SignIn(email, password)
      .then((token: string) => {
        res.status(200).json({ token });
      })
      .catch((error: string) => {
        res.status(400).json({ error });
      });
  });
};
