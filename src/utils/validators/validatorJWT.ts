/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import passport from 'passport';
import JWTStrategy, { ExtractJwt } from 'passport-jwt';
import { config } from '../../config';

passport.use(new JWTStrategy.Strategy({
  secretOrKey: config.jwtSecretWord,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
},
async (jwtPayload, cb) => {
  try {
    const { email } = jwtPayload;
    return cb(
      null, { email },
    );
  } catch (error) {
    return cb(error);
  }
}));
