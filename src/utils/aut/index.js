import passport from 'passport';

import { LocalStrategy } from './strategies/local.strategy.js';
import { jwtStrategy } from './strategies/jwt.strategy.js';

passport.use(LocalStrategy);
passport.use(jwtStrategy);
