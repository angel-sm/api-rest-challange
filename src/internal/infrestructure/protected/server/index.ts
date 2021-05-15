/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import passport from 'passport';
import { Application, Request, Response } from 'express';
import { ProtectedService } from '../../../core/services/protected/service';
import { validatorSchemaHandler } from '../../../../utils/validators/validatorSchema';
import urlHandler from '../../../../utils/validators/validatorURL';
import { ProtectedSchema } from '../../../core/domain/protected';

import '../../../../utils/validators/validatorJWT';

export const ProtectedServer = (app: Application, router: any) => {
  const service = new ProtectedService();

  app.use('/', router);

  router.get('/me', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    res.status(200).json(req.user);
  });

  router.post('/get-links', passport.authenticate('jwt', { session: false }), validatorSchemaHandler(ProtectedSchema), urlHandler.validatorURL(), (req: Request, res: Response) => {
    service.generateFile(req.body.url, res);
  });
};
